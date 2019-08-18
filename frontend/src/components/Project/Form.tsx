import * as React from 'react'

type Props = {
  organizationId?: number,
  title: string,
}

export default function Form (props: Props) {
  return (
    <div className="card card-default">
      <div className="card-body">
        <h5 className="card-title mb-4">{props.title}</h5>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Description</label>
            <textarea
              className="form-control"
              name="name"
            />
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-success">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}