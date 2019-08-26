import * as React from 'react'
import styled from 'styled-components'

import Pipeline, { PipelineType } from '@/components/Project/Pipeline'
import StoryCard from '@/components/Story/Card'
import { formatDate } from '@/helpers/Date'
import { StoryState } from '@/models/Story'

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
  startDay: Date,
  endDay: Date,
  iterationsCount: number,
}

export default function Pipelines (props: Props) {
  console.log(props.project)
  const { project, startDay, endDay, iterationsCount, stories } = props

  const currentStories = StoryState.extractCurrentIteration(stories)
  const backlogStories = StoryState.extractBacklog(stories)
  const iceboxStories = StoryState.extractIcebox(stories)

  return (
    <Wrapper>
      <Pipeline width={minPWidth} type={PipelineType.Current}>
        <p className="font-weight-bold text-secondary">
          {formatDate(startDay)} - {formatDate(endDay)}
          &nbsp;&nbsp;
          ITERATION {iterationsCount}
        </p>
        {currentStories.map(story => (
          <StoryCard key={story.id} story={story} />
        ))}
      </Pipeline>
      <Pipeline width={minPWidth} type={PipelineType.Backlog}>
        {backlogStories.map(story => (
          <StoryCard key={story.id} story={story} />
        ))}
      </Pipeline>
      <Pipeline width={minPWidth} type={PipelineType.Icebox}>
        {iceboxStories.map(story => (
          <StoryCard key={story.id} story={story} />
        ))}
      </Pipeline>
    </Wrapper>
  )
}