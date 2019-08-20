import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'

import Pipelines from '@/components/Project/Pipelines'
import MainContainer from '@/components/MainContainer'
import AlertError from '@/components/AlertError'
import { convert as convertProject } from '@/models/Project'
import { convert as convertStory } from '@/models/Story'
const projectStoriesQuery = require('@/graphql/Query/ProjectStories.graphql')

type Props = {
  match: RouteMatch,
}

export default function Show (props: Props) {
  const organizationId = parseInt(props.match.params.organizationId)
  const projectId = parseInt(props.match.params.projectId)

  const { loading, error, data } = useQuery(projectStoriesQuery, {
    variables: { id: projectId }
  })

  if (loading) {
    return <>'loading...'</>
  }

  if (error) {
    return (
      <MainContainer>
        <AlertError>{error.message}</AlertError>
      </MainContainer>
    )
  }

  const project: ProjectT = convertProject(data.project)
  const stories: StoryT[] = data.project.stories.map(convertStory)

  return (
    <Pipelines project={project} stories={stories} />
  )
}