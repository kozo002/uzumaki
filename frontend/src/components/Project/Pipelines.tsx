import * as React from 'react'
import styled from 'styled-components'

import Pipeline, { PipelineType } from '@/components/Project/Pipeline'
import StoryCard from '@/components/Story/Card'
import { formatDate } from '@/helpers/Date'
import Story from '@/models/Story'
import StoryCollection, { IterationStoriesOptionsI } from '@/models/StoryCollection'

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
  stories: Story[],
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

  const current = StoryCollection.extractCurrentIteration(stories)
  const backlog = StoryCollection.extractBacklog(stories)
  const icebox = StoryCollection.extractIcebox(stories)
  const iterationStories = backlog.iterationStories({
    currentIteration: { startDay, endDay },
    iterationsLength: project.iterationLength,
    velocity: project.velocity,
  } as IterationStoriesOptionsI)

  return (
    <Wrapper>
      <Pipeline width={minPWidth} type={PipelineType.Current}>
        <IterationHeader start={startDay} end={endDay} count={iterationsCount} />
        {current.stories.map(story => (
          <StoryCard key={story.id} story={story} />
        ))}
      </Pipeline>
      <Pipeline width={minPWidth} type={PipelineType.Backlog}>
        {iterationStories.map((iteration, i) => (
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
        {icebox.stories.map(story => (
          <StoryCard key={story.id} story={story} />
        ))}
      </Pipeline>
    </Wrapper>
  )
}