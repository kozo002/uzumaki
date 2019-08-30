import { convert as convertUser } from '@/models/User'
import StoryState from '@/models/StoryState'
import StoryType from '@/models/StoryType'

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
    prevId: data.prevId,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  } as StoryT
}

export default class Story {
  readonly id: number
  readonly title: string
  readonly description: string | null
  readonly state: StoryState
  readonly type: StoryType
  readonly points: number | null
  readonly requester: UserT | null
  readonly inIcebox: boolean
  readonly prevId: number | null
  readonly createdAt: Date
  readonly updatedAt: Date

  constructor (data: StoryPayloadT) {
    this.id = parseInt(data.id)
    this.title = data.title
    this.description = data.description
    this.state = StoryState.convert(data.state)
    this.type = StoryType.convert(data.type)
    this.points = data.points
    this.requester = convertUser(data.requester)
    this.inIcebox = data.inIcebox
    this.prevId = data.prevId
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }

  clone (): Story {
    return new Story({
      id: this.id.toString(),
      title: this.title,
      description: this.description,
      state: this.state,
      type: this.type,
      points: this.points,
      requester: {
        id: this.requester.id.toString(),
        name: this.requester.name,
      },
      inIcebox: this.inIcebox,
      prevId: this.prevId,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    })
  }

  willStart (input: StoryInputI): boolean {
    return this.state === StoryState.UNSTARTED && input.state === StoryState.STARTED
  }

  willAccept (input: StoryInputI): boolean {
    return this.state === StoryState.DELIVERED && input.state === StoryState.ACCEPTED
  }
}