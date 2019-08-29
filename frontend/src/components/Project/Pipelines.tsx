import * as React from 'react'
import styled from 'styled-components'
import uniq from 'lodash/uniq'

import Pipeline, { PipelineType } from '@/components/Project/Pipeline'
import StoryCard from '@/components/Story/Card'
import { formatDate } from '@/helpers/Date'
import Project from '@/models/Project'
import Story from '@/models/Story'
import StoryState from '@/models/StoryState'
import StoryCollection, { IterationStoriesOptionsI } from '@/models/StoryCollection'

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
  stories: Story[]
  startDay: Date
  endDay: Date
  iterationsCount: number
  onStoriesUpdate: (stories: Story[], inputs: StoryInputI[]) => void
}

function IterationHeader (props: { start: Date, end: Date, count: number, total: number }): React.ReactElement {
  return (
    <p className="font-weight-bold text-secondary d-flex justify-content-between">
      <span>
        {formatDate(props.start)} - {formatDate(props.end)}
        &nbsp;&nbsp;
        ITERATION {props.count}
      </span>
      <span>
        TOTAL {props.total}
      </span>
    </p>
  )
}

interface useLoadingStoriesValueI {
  loadingStoryIds: number[]
  addLoading: (id: number) => void
  removeLoading: (id: number) => void
  checkLoading: (id: number) => boolean
}
function useLoadingStories (): useLoadingStoriesValueI {
  const [loadingStoryIds, setStoryIds] = React.useState<number[]>([])
  const addLoading = (id: number) => {
    setStoryIds(uniq([...loadingStoryIds, id]))
  }
  const removeLoading = (id: number) => {
    setStoryIds(loadingStoryIds.filter(it => it !== id))
  }
  const checkLoading = (id: number): boolean => {
    return loadingStoryIds.indexOf(id) > -1
  }
  return { loadingStoryIds, addLoading, removeLoading, checkLoading }
}

export default function Pipelines (props: Props) {
  console.log(props.project)
  const { project, startDay, endDay, iterationsCount, stories, onStoriesUpdate } = props

  const current = StoryCollection.extractCurrentIteration(stories)
  const backlog = StoryCollection.extractBacklog(stories)
  const icebox = StoryCollection.extractIcebox(stories)
  const iterationStories = backlog.iterationStories({
    currentIteration: { startDay, endDay },
    iterationsLength: project.iterationLength,
    velocity: project.velocity,
  } as IterationStoriesOptionsI)

  const { addLoading, removeLoading, checkLoading } = useLoadingStories()

  const handleStateChange = async (story: Story, state: StoryState) => {
    addLoading(story.id)
    let input = { state } as StoryInputI
    let nextStory
    if (story.willStart(input)) {
      input.prevId = current.lastStory.id
      const prevStory = backlog.findPrevStory(story)
      nextStory = backlog.findNextStory(story)
      let nextStoryInput = { prevId: prevStory ? prevStory.id : null }
      addLoading(nextStory.id)
      await onStoriesUpdate([story, nextStory], [input, nextStoryInput])
      removeLoading(story.id)
      removeLoading(nextStory.id)
    }
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
          start={startDay}
          end={endDay}
          count={iterationsCount}
          total={current.totalPoints} 
        />
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
        {iterationStories.map((iteration, i) => (
          <React.Fragment key={i}>
            <IterationHeader
              start={iteration.startDay}
              end={iteration.endDay}
              count={iterationsCount + i + 1}
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