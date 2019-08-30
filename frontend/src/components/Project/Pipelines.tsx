import * as React from 'react'
import styled from 'styled-components'

import Pipeline, { PipelineType } from '@/components/Project/Pipeline'
import StoryCard from '@/components/Story/Card'
import IterationHeader from '@/components/Project/Pipelines/IterationHeader'
import Project from '@/models/Project'
import Story from '@/models/Story'
import StoryState from '@/models/StoryState'
import StoryCollection, { IterationStoriesI } from '@/models/StoryCollection'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #f6f6fb;
`

const minPWidth = 375

interface Props {
  project: Project
  done: StoryCollection
  current: StoryCollection
  icebox: StoryCollection
  backlog: IterationStoriesI[]
  currentIteration: IterationDataI
  onStoryUpdate: (story: Story, input: StoryInputI) => void
  checkLoading: (id: number) => boolean,
}
export default function Pipelines (props: Props) {
  const {
    project,
    currentIteration,
    onStoryUpdate,
    done,
    current,
    icebox,
    backlog,
    checkLoading,
  } = props

  console.log(project)

  const handleStateChange = async (story: Story, state: StoryState) => {
    onStoryUpdate(story, { state } as StoryInputI)
  }

  const handleSelectPoints = (story: Story, points: number | null) => {
    // console.log({ story, points })
    // setLoading({ storyId: story.id })
    // setTimeout(() => setLoading({ storyId: null }), 1000)
  }

  return (
    <Wrapper>
      <Pipeline width={minPWidth} type={PipelineType.Current}>
        <IterationHeader
          start={currentIteration.startDay}
          end={currentIteration.endDay}
          total={done.totalPoints + current.totalPoints}
        />
        {done.stories.map(story => (
          <StoryCard
            key={story.id}
            story={story}
            done
            loading={checkLoading(story.id)}
            onStateChange={handleStateChange}
            onSelectPoints={handleSelectPoints}
          />
        ))}
        {current.stories.map(story => (
          <StoryCard
            key={story.id}
            story={story}
            current
            loading={checkLoading(story.id)}
            onStateChange={handleStateChange}
            onSelectPoints={handleSelectPoints}
          />
        ))}
      </Pipeline>
      <Pipeline width={minPWidth} type={PipelineType.Backlog}>
        {backlog.map((iteration, i) => (
          <React.Fragment key={i}>
            <IterationHeader
              start={iteration.startDay}
              end={iteration.endDay}
              total={iteration.totalPoints} 
            />
            {iteration.stories.map(story => (
              <StoryCard
                key={story.id}
                story={story}
                loading={checkLoading(story.id)}
                onStateChange={handleStateChange}
                onSelectPoints={handleSelectPoints}
              />
            ))}
          </React.Fragment>
        ))}
      </Pipeline>
      <Pipeline width={minPWidth} type={PipelineType.Icebox}>
        {icebox.stories.map(story => (
          <StoryCard
            key={story.id}
            story={story}
            icebox
            loading={checkLoading(story.id)}
            onStateChange={handleStateChange}
            onSelectPoints={handleSelectPoints}
          />
        ))}
      </Pipeline>
    </Wrapper>
  )
}