import * as React from 'react'

import { RouteMatch } from '../../../types/index.d'
import ProjectForm from '../../../components/Project/Form'
import ProjectNewContainer from '../../../containers/ProjectNew'

type Props = {
  match: RouteMatch,
}

export default function New (props: Props) {
  const { organizationId } = props.match.params

  return (
    <div className="container pt-3">
      <ProjectNewContainer>
        {props => (
          <ProjectForm
            title="Create a new project"
            organizationId={parseInt(organizationId)}
          />
        )}
      </ProjectNewContainer>
    </div>
  )
}