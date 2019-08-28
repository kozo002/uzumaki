enum StoryType {
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

namespace StoryType {
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

export default StoryType