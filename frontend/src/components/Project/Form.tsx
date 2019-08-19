import * as React from 'react'
import classnames from 'classnames'

import { ProjectInputT } from '@/types/index.d'

type Props = {
  title: string,
  onSubmit: (e: React.FormEvent) => void,
  onChange: (e: React.ChangeEvent) => void,
  onBlur: (e: React.FocusEvent) => void,
  values: ProjectInputT,
  errors: { [key: string]: string },
  isSubmitting: boolean,
}

export default function Form (props: Props) {
  return (
    <div className="card card-default">
      <div className="card-body">
        <h5 className="card-title mb-4">{props.title}</h5>
        <form onSubmit={props.onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className={classnames('form-control', {
                'is-invalid': Boolean(props.errors.name)
              })}
              name="name"
              onChange={props.onChange}
              onBlur={props.onBlur}
              value={props.values.name}
              disabled={props.isSubmitting}
            />
            {props.errors.name && (
              <div className="invalid-feedback">{props.errors.name}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="name">Description</label>
            <textarea
              className="form-control"
              name="description"
              onChange={props.onChange}
              onBlur={props.onBlur}
              value={props.values.description}
              disabled={props.isSubmitting}
            />
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-success"
              disabled={props.isSubmitting}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}