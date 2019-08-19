import * as React from 'react'
import chunk from 'lodash/chunk'
import { Link } from 'react-router-dom'

import { OrganizationT } from '@/types/index.d'
import * as r from '@/helpers/Route'

interface Props {
  organizations: [OrganizationT]
}

export default function OrganizationList (props: Props) {
  return (
    <div>
      {props.organizations.map(org => (
        <div key={org.id}>
          <h2 className="h5">{org.name}</h2>
          <p>{org.description || 'no description'}</p>
          <Link
            className="btn btn-primary"
            to={r.newProjectPath(org.id)}
          >
            Add a new Project
          </Link>

          {chunk(org.projects, 2).map((projects, i) => (
            <div className="row" key={i}>
              {projects.map(project => (
                <div className="card card-default col-6" key={project.id}>
                  <div className="card-body">
                    <h3 className="h6">{project.name}</h3>
                    <p>{project.description || 'no description'}</p>
                    <Link
                      className="btn btn-primary"
                      to={r.editProjectPath(org.id, project.id)}
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}