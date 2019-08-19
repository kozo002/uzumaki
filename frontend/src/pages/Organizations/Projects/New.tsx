import * as React from 'react'

import { RouteMatch, RouteHistory } from '@/types/index.d'
import MainContainer from '@/components/MainContainer'
import ProjectForm from '@/components/Project/Form'
import ProjectFormContainer from '@/containers/ProjectForm'
import * as r from '@/helpers/Route'

type Props = {
  match: RouteMatch,
  history: RouteHistory,
}

export default function New (props: Props) {
  const organizationId = parseInt(props.match.params.organizationId)
  const handleSucceeded = (projectId: number) => {
    props.history.push(r.showProjectPath(organizationId, projectId))
  }

  return (
    <MainContainer>
      <ProjectFormContainer
        organizationId={organizationId}
        onSucceeded={handleSucceeded}
        title="Create a new project"
        component={ProjectForm}
      />
    </MainContainer>
  )
}