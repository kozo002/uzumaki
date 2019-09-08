import * as React from 'react'
import Markdown from 'react-markdown'

import Story from '@/models/Story'
import EditableHeading from '@/components/EditableHeading'

type Props = {
  story: Story,
  onUpdate: (story: Story, input: StoryInputI) => Promise<any>,
}

export default function Detail (props: Props) {
  const { story, onUpdate } = props

  return (
    <article>
      <EditableHeading
        value={story.title}
        tagLevel="h1"
        onSave={(title: string) => onUpdate(story, { title })}
      />
      <Markdown source={story.description} />
    </article>
  )
}