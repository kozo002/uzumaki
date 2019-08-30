import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useDispatch } from 'react-redux'
import sortBy from 'lodash/sortBy'

import Pipelines from '@/components/Project/Pipelines'
import MainContainer from '@/components/MainContainer'
import AlertError from '@/components/AlertError'
import Project from '@/models/Project'
import Story from '@/models/Story'
import { setTitle } from '@/store/modules/title'
import StoryCRUD, { InjectionProps as StoriesUpdatingProps } from '@/containers/StoryCRUD'

const projectStoriesQuery = require('@/graphql/Query/ProjectStories.graphql')

type Props = {
  match: RouteMatch,
}

export default function Show (props: Props) {
  const organizationId = parseInt(props.match.params.organizationId)
  const projectId = parseInt(props.match.params.projectId)
  const dispatch = useDispatch()
  const { loading, error, data } = useQuery(projectStoriesQuery, {
    variables: { id: projectId }
  })

  React.useEffect(() => {
    if (data && data.project) {
      const { name } = data.project
      dispatch(setTitle({ windowTitle: name, headerTitle: name }))
    }
  })

  if (loading) { return <>'loading...'</> }

  if (error) {
    return (
      <MainContainer>
        <AlertError>{error.message}</AlertError>
      </MainContainer>
    )
  }

  const project: Project = new Project(data.project)
  const stories: Story[] = sortBy(data.project.stories, it => it.prevId)
    .map((it: StoryPayloadT) => new Story(it))

  return (
    <StoryCRUD
      project={project}
      stories={stories}
    >
      {(props: StoriesUpdatingProps) => (
        <Pipelines
          project={project}
          done={props.done}
          current={props.current}
          icebox={props.icebox}
          backlog={props.backlog}
          currentIteration={props.currentIteration}
          onStoryUpdate={props.onStoryUpdate}
          checkLoading={props.checkLoading}
        />
      )}
    </StoryCRUD>
  )
}