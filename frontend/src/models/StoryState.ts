enum StoryState {
  UNSTARTED = 'UNSTARTED',
  STARTED = 'STARTED',
  FINISHED = 'FINISHED',
  DELIVERED = 'DELIVERED',
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
}

namespace StoryState {
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
}

export default StoryState