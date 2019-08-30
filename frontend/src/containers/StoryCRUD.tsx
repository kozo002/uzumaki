import * as React from 'react'
import { useMutation } from '@apollo/react-hooks'

import Project from '@/models/Project'
import Story from '@/models/Story'
import StoryCollection, {
  IterationStoriesOptionsI,
  IterationStoriesI,
} from '@/models/StoryCollection'

import { calcIteration } from '@/helpers/Iteration'
import useLoadingIds from '@/hooks/useLoadingIds';
import Update from '@/containers/StoryCRUD/Update'

const updateStoriesMutation = require('@/graphql/Mutation/updateStories.graphql')

interface Props {
  children: (props: InjectionProps) => React.ReactElement,
  project: Project
  stories: Story[]
}

export interface InjectionProps {
  done: StoryCollection
  current: StoryCollection
  icebox: StoryCollection
  backlog: IterationStoriesI[]
  currentIteration: IterationDataI
  onStoryUpdate: (story: Story, input: StoryInputI) => void
  checkLoading: (id: number) => boolean
}

export default function StoryCRUD (props: Props) {
  const { project, stories } = props
  const { id: projectId, iterationLength, velocity } = project
  const currentIteration = calcIteration(project)
  const { addLoading, removeLoading, checkLoading } = useLoadingIds()

  const [updateStories] = useMutation<UpdateStoryPayloadI, StoriesParametersI>(updateStoriesMutation)

  const requestUpdate = async (stories: Story[], inputs: StoryInputI[]) => {
    const ids = stories.map(it => it.id)
    await updateStories({ variables: { projectId, ids, inputs } })
  }

  const done = StoryCollection.extractDone(stories)
  const current = StoryCollection.extractCurrentIteration(stories)
  const backlog = StoryCollection.extractBacklog(stories)
  const icebox = StoryCollection.extractIcebox(stories)
  const iterationStories = backlog.iterationStories({
    currentIteration,
    iterationLength,
    velocity,
  } as IterationStoriesOptionsI)

  const onStoryUpdate = Update({
    addLoading,
    removeLoading,
    current,
    backlog,
    icebox,
    requestUpdate,
  })

  const injection: InjectionProps = {
    done,
    current,
    icebox,
    backlog: iterationStories,
    currentIteration,
    onStoryUpdate,
    checkLoading,
  }
  return props.children(injection)
}