import * as React from 'react'
import chunk from 'lodash/chunk'
import { Link } from 'react-router-dom'

import { OrganizationT } from '@/types/index.d'
import * as r from '@/helpers/Route'
import ProjectCard from '@/components/Project/Card'

interface Props {
  organizations: [OrganizationT]
}

export default function OrganizationList (props: Props) {
  return (
    <div>
      <small className="d-block pb-4 text-uppercase text-secondary">Organizations</small>
      {props.organizations.map(org => (
        <section key={org.id}>
          <header className="d-flex justify-content-between">
            <div>
              <h2 className="h5">{org.name}</h2>
              <p className="text-secondary">{org.description || 'No description'}</p>
            </div>
            <div>
              <Link
                className="btn btn-outline-primary"
                to={r.newProjectPath(org.id)}
              >
                Add a new Project
              </Link>
            </div>
          </header>

          <div className="row">
            {org.projects.map(project => (
              <div className="col-md-6 col-lg-4 mb-4">
                <ProjectCard project={project} organizationId={org.id} />
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="py-5 d-flex justify-content-center">
        <Link to="/organizations/new" className="btn btn-link">Add a new organization</Link>
      </div>
    </div>
  )
}