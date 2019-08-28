import addDays from 'date-fns/addDays'
import { convert as convertUser } from '@/models/User'

export enum StoryState {
  UNSTARTED = 'unstarted',
  STARTED = 'started',
  FINISHED = 'finished',
  DELIVERED = 'delivered',
  REJECTED = 'rejected',
  ACCEPTED = 'accepted',
}

export namespace StoryState {
  export function toArray (): Array<StoryState> {
    return [
      StoryState.UNSTARTED,
      StoryState.STARTED,
      StoryState.FINISHED,
      StoryState.DELIVERED,
      StoryState.REJECTED,
      StoryState.ACCEPTED,
    ]
  }

  export function convert (value: string): StoryState {
    const index = Object.keys(StoryState).indexOf(value)
    return StoryState.toArray()[index]
  }

  export function extractCurrentIteration (stories: StoryT[]): StoryT[] {
    const array = StoryState.toArray()
    return stories.filter(it => array.indexOf(it.state) > 1)
  }

  export function extractBacklog (stories: StoryT[]): StoryT[] {
    const array = StoryState.toArray()
    return stories.filter(it => array.indexOf(it.state) <= 1)
  }

  export function extractIcebox (stories: StoryT[]): StoryT[] {
    return stories.filter(it => it.inIcebox)
  }
}

export enum StoryType {
  FEATURE = 'feature',
  BUG = 'bug',
  CHORE = 'chore',
  RELEASE = 'release'
}
const StoryTypeIcons = {
  [StoryType.FEATURE]: 'star',
  [StoryType.BUG]: 'bug_report',
  [StoryType.CHORE]: 'settings',
  [StoryType.RELEASE]: 'flag',
}
export namespace StoryType {
  export function iconName (type: StoryType) {
    return StoryTypeIcons[type]
  }

  export function toArray (): Array<StoryType> {
    return [
      StoryType.FEATURE,
      StoryType.BUG,
      StoryType.CHORE,
      StoryType.RELEASE,
    ]
  }

  export function convert (value: string): StoryType {
    const index = Object.keys(StoryType).indexOf(value)
    return StoryType.toArray()[index]
  }
}

export function convert (data: StoryPayloadT): StoryT {
  return {
    id: parseInt(data.id),
    title: data.title,
    description: data.description,
    state: StoryState.convert(data.state),
    type: StoryType.convert(data.type),
    points: data.points,
    requester: convertUser(data.requester),
    inIcebox: data.inIcebox,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  } as StoryT
}

export interface SplitBacklogOptionsI {
  currentIteration: {
    startDay: Date
    endDay: Date
  }
  iterationsLength: number
  velocity: number,
}
export interface SplitBacklogResultI {
  startDay: Date | null
  endDay: Date | null
  stories: StoryT[]
}
export function splitBacklog (stories: StoryT[], options: SplitBacklogOptionsI): SplitBacklogResultI[] {
  const { currentIteration, iterationsLength, velocity } = options
  const firstStartDay = addDays(currentIteration.endDay, 1)

  const splitStories = stories.reduce((acc, story) => {
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

  return splitStories.map((stories, i) => {
    const startDay = addDays(firstStartDay, iterationsLength * 7 * i)
    const endDay = addDays(startDay, iterationsLength * 7 - 1)
    return {
      startDay,
      endDay,
      stories,
      totalPoints: stories.reduce((acc, it) => acc + it.points, 0)
    } as SplitBacklogResultI
  })
}