import * as React from 'react'
import { Link } from 'react-router-dom'

import * as r from '@/helpers/Route'

type Props = {
  project: ProjectT,
  organizationId: number,
}

export default function Card (props: Props) {
  const { project, organizationId } = props
  return (
    <div className="card card-default" key={project.id}>
      <div className="card-body">
        <h3 className="h6">{project.name}</h3>
        <p className="text-secondary">{project.description || 'no description'}</p>
        <div className="d-flex justify-content-end">
          <Link
            className="card-link text-uppercase"
            to={r.editProjectPath(organizationId, project.id)}
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  )
}