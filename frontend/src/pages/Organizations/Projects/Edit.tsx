import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'

import MainContainer from '@/components/MainContainer'
import AlertError from '@/components/AlertError'
import ProjectForm from '@/components/Project/Form'
import ProjectFormContainer from '@/containers/ProjectForm'
import * as r from '@/helpers/Route'
const ProjectQuery = require('@/graphql/Query/Project.graphql')

type Props = {
  match: RouteMatch,
  history: RouteHistory,
}

export default function Edit (props: Props) {
  const organizationId = parseInt(props.match.params.organizationId)
  const projectId = parseInt(props.match.params.projectId)
  const { loading, error, data } = useQuery(ProjectQuery, {
    variables: { id: projectId }
  })
  const handleSucceeded = (projectId: number) => {
    props.history.push(r.showProjectPath(organizationId, projectId))
  }

  let content: React.ReactNode = <AlertError>Cannot found project</AlertError>
  if (loading) { content = 'loading...' }
  if (error) {
    console.error(error)
    content = <AlertError>{error.message}</AlertError>
  }
  if (data.project) {
    content = (
      <ProjectFormContainer
        organizationId={organizationId}
        onSucceeded={handleSucceeded}
        title="Edit project"
        component={ProjectForm}
        project={data.project}
      />
    )
  }

  return <MainContainer>{content}</MainContainer>
}