import * as React from 'react'

import { StoryType } from '@/models/Story'

const Colors = {
  [StoryType.FEATURE]: 'rgb(255, 219, 62)',
  [StoryType.BUG]: '#d87350',
  [StoryType.CHORE]: '#939592',
  [StoryType.RELEASE]: '#278dd8',
}

type Props = {
  type: StoryType,
}

export default function TypeIcon (props: Props) {
  return (
    <i className="material-icons" style={{ color: Colors[props.type] }}>
      {StoryType.iconName(props.type)}
    </i>
  )
}