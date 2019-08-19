import * as React from 'react'
import { Link } from 'react-router-dom'

import * as r from '@/helpers/Route'
import ProjectCard from '@/components/Project/Card'
import EmptyMessage from '@/components/EmptyMessage'

interface Props {
  organizations: [OrganizationT]
}

export default function OrganizationList (props: Props) {
  return (
    <div>
      <small className="d-block pb-4 text-uppercase text-secondary">Organizations</small>
      {props.organizations.map(org => (
        <section key={org.id} className="pb-3">
          <header className="d-flex justify-content-between">
            <div>
              <h2 className="h5">
                {org.name}
                <small className="d-inline-block ml-3">
                  <Link
                    to={r.editOrganizationPath(org.id)}
                    className="text-uppercase"
                  >
                    Edit
                  </Link>
                </small>
              </h2>
              <p className="text-secondary">{org.description || 'No description'}</p>
            </div>
            <div>
              <Link
                className="btn btn-link"
                to={r.newProjectPath(org.id)}
              >
                + Add a new Project
              </Link>
            </div>
          </header>

          {org.projects.length > 0 ? (
            <div className="row">
              {org.projects.map(project => (
                <div className="col-md-6 col-lg-4 mb-4" key={project.id}>
                  <ProjectCard project={project} organizationId={org.id} />
                </div>
              ))}
            </div>
          ) : <EmptyMessage>No project</EmptyMessage>}
        </section>
      ))}

      <div className="py-5 d-flex justify-content-center">
        <Link to="/organizations/new" className="btn btn-link">+ Add a new organization</Link>
      </div>
    </div>
  )
}