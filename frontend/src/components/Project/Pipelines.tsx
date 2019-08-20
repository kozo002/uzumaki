import * as React from 'react'
import styled from 'styled-components'

import Pipeline, { PipelineType } from '@/components/Project/Pipeline'
import StoryCard from '@/components/Story/Card'
// import { StoryState, StoryType } from '@/models/Story'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #f0f0f7;
`

const minPWidth = 375

type Props = {
  project: ProjectT,
  stories: StoryT[],
}

export default function Pipelines (props: Props) {
  console.log(props.project)
  return (
    <Wrapper>
      <Pipeline width={minPWidth} type={PipelineType.Current}>
        {props.stories.map(story => (
          <StoryCard key={story.id} story={story} />
        ))}
      </Pipeline>
      <Pipeline width={minPWidth} type={PipelineType.Backlog}></Pipeline>
      <Pipeline width={minPWidth} type={PipelineType.Icebox}></Pipeline>
    </Wrapper>
  )
}