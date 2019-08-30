import inRange from 'lodash/inRange'
import addDays from 'date-fns/addDays'

import Story from '@/models/Story'
import StoryState from '@/models/StoryState'

export interface IterationStoriesOptionsI {
  currentIteration: {
    startDay: Date
    endDay: Date
  }
  iterationLength: number
  velocity: number,
}
export interface IterationStoriesI {
  startDay: Date | null
  endDay: Date | null
  stories: Story[]
  totalPoints: number
}

interface OptionsI {
  sort?: boolean
}

export default class StoryCollection {
  stories: Story[]
  private __iterationStories: IterationStoriesI[]

  static extractDone (stories: Story[]): StoryCollection {
    const filtered = stories.filter(it => it.state === StoryState.ACCEPTED)
    return new StoryCollection(filtered, { sort: false })
  }

  static extractCurrentIteration (stories: Story[]): StoryCollection {
    const filtered = stories.filter(it =>
      it.state !== StoryState.UNSTARTED
      && it.state !== StoryState.ACCEPTED
      && !it.inIcebox
    )
    return new StoryCollection(filtered)
  }

  static extractBacklog (stories: Story[]): StoryCollection {
    const filtered = stories.filter(it => 
      it.state === StoryState.UNSTARTED && !it.inIcebox
    )
    return new StoryCollection(filtered)
  }

  static extractIcebox (stories: Story[]): StoryCollection {
    const filtered = stories.filter(it => it.inIcebox)
    return new StoryCollection(filtered)
  }

  constructor (stories: Story[], options: OptionsI = { sort: true }) {
    this.stories = options.sort
      ? this.sortByPrevId(stories)
      : stories
    this.__iterationStories = null
  }

  get totalPoints (): number {
    return this.stories.reduce((acc, it) => acc + it.points, 0)
  }

  get lastStory (): Story {
    return this.stories[this.stories.length - 1]
  }

  findPrevStory (story: Story): Story | null {
    return this.stories.find(it => it.id === story.prevId) || null
  }

  findNextStory (story: Story): Story | null {
    return this.stories.find(it => it.prevId === story.id) || null
  }

  private sortByPrevId (stories: Story[]): Story[] {
    if (stories.length < 2) { return stories }

    function binarySearch (targetId: number, stories: Story[]): Story {
      if (stories.length === 1) { return stories[0] }
      const middle = Math.floor(stories.length / 2)
      const left = stories.slice(0, middle)
      const right = stories.slice(middle)
      if (inRange(targetId, left[0].prevId, left[left.length - 1].prevId + 1)) {
        return binarySearch(targetId, left)
      }
      if (inRange(targetId, right[0].prevId, right[right.length - 1].prevId + 1)) {
        return binarySearch(targetId, right)
      }
    }

    let target = stories.find(it => it.prevId === null)
    const targets = stories.filter(it => it.prevId)
    let results: Story[] = []
    while (results.length < stories.length) {
      if (target.prevId === null) {
        results.push(target.clone()) 
      }
      const next = binarySearch(target.id, targets)
      results.push(next.clone())
      target = next.clone()
    }
    return results
  }

  iterationStories (options: IterationStoriesOptionsI): IterationStoriesI[] {
    if (this.__iterationStories !== null) { return this.__iterationStories }
    const { currentIteration, iterationLength, velocity } = options
    const firstStartDay = addDays(currentIteration.endDay, 1)

    const splitStories = this.stories.reduce((acc, story) => {
      const lastBlock = acc.length === 0 ? [] : acc[acc.length - 1]
      const totalPoints = lastBlock.reduce((acc, it) => acc + (it.points || 0), 0) + story.points
      if (totalPoints > velocity) {
        acc.push([story])
      } else {
        lastBlock.push(story)
        if (acc.length === 0) {
          acc[0] = lastBlock
        } else {
          acc[acc.length - 1] = lastBlock
        }
      }
      return acc
    }, [] as Array<Story[]>)

    this.__iterationStories = splitStories.map((stories, i) => {
      const startDay = addDays(firstStartDay, iterationLength * 7 * i)
      const endDay = addDays(startDay, iterationLength * 7 - 1)
      return {
        startDay,
        endDay,
        stories,
        totalPoints: stories.reduce((acc, it) => acc + it.points, 0)
      } as IterationStoriesI
    })

    return this.__iterationStories
  }
}