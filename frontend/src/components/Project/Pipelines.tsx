import * as React from 'react'
import styled from 'styled-components'

import Pipeline, { PipelineType } from '@/components/Project/Pipeline'
import StoryCard from '@/components/Story/Card'
import { formatDate } from '@/helpers/Date'
import { StoryState, splitBacklog, SplitBacklogOptionsI } from '@/models/Story'

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

function IterationHeader (props: { start: Date, end: Date, count: number }): React.ReactElement {
  return (
    <p className="font-weight-bold text-secondary">
      {formatDate(props.start)} - {formatDate(props.end)}
      &nbsp;&nbsp;
      ITERATION {props.count}
    </p>
  )
}

export default function Pipelines (props: Props) {
  console.log(props.project)
  const { project, startDay, endDay, iterationsCount, stories } = props

  const currentStories = StoryState.extractCurrentIteration(stories)
  const backlogStories = StoryState.extractBacklog(stories)
  const iceboxStories = StoryState.extractIcebox(stories)
  const splitBacklogStories = splitBacklog(backlogStories, {
    currentIteration: { startDay, endDay },
    iterationsLength: project.iterationLength,
    velocity: project.velocity,
  } as SplitBacklogOptionsI)

  return (
    <Wrapper>
      <Pipeline width={minPWidth} type={PipelineType.Current}>
        <IterationHeader start={startDay} end={endDay} count={iterationsCount} />
        {currentStories.map(story => (
          <StoryCard key={story.id} story={story} />
        ))}
      </Pipeline>
      <Pipeline width={minPWidth} type={PipelineType.Backlog}>
        {splitBacklogStories.map((iteration, i) => (
          <React.Fragment key={i}>
            <IterationHeader
              start={iteration.startDay}
              end={iteration.endDay}
              count={iterationsCount + i + 1}
            />
            {iteration.stories.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </React.Fragment>
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