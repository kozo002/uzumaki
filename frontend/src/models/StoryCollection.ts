import inRange from 'lodash/inRange'
import addDays from 'date-fns/addDays'

export interface IterationStoriesOptionsI {
  currentIteration: {
    startDay: Date
    endDay: Date
  }
  iterationsLength: number
  velocity: number,
}
export interface IterationStoriesI {
  startDay: Date | null
  endDay: Date | null
  stories: StoryT[]
}

export default class StoryCollection {
  stories: StoryT[]
  private __iterationStories: IterationStoriesI[]

  constructor (stories: StoryT[]) {
    this.stories = this.sortByPrevId(stories)
    this.__iterationStories = null
  }

  private sortByPrevId (stories: StoryT[]) {
    if (stories.length < 2) { return stories }

    function binarySearch (targetId: number, stories: StoryT[]): StoryT {
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
    let results = []
    while (results.length < stories.length) {
      if (target.prevId === null) {
        results.push({ ...target }) 
      }
      const next = binarySearch(target.id, targets)
      results.push({ ...next })
      target = { ...next }
    }
    return results
  }

  iterationStories (options: IterationStoriesOptionsI): IterationStoriesI[] {
    if (this.__iterationStories !== null) { return this.__iterationStories }
    const { currentIteration, iterationsLength, velocity } = options
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
    }, [] as Array<StoryT[]>)

    this.__iterationStories = splitStories.map((stories, i) => {
      const startDay = addDays(firstStartDay, iterationsLength * 7 * i)
      const endDay = addDays(startDay, iterationsLength * 7 - 1)
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