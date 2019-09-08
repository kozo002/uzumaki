import * as React from 'react'
import styled from 'styled-components'
import { ChangeEvent } from 'jest-haste-map/build/types'

type Props = {
  value: string,
  tagLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  className?: string,
  onSave: (value: string) => Promise<void>,
}

const fontSize = 1.4

const Input = styled.input`
  font-size: ${fontSize}rem;
  font-weight: 500;
`

export default function EditableHeading (props: Props) {
  const [isEditing, updateEditing] = React.useState(false)
  const [isLoading, updateLoading] = React.useState(false)
  const [value, updateValue] = React.useState(props.value)

  async function handleSave () {
    updateLoading(true)
    await props.onSave(value)
    updateLoading(false)
    updateEditing(false)
  }
  
  if (isEditing) {
    return (
      <form className="input-group mb-3" onSubmit={handleSave}>
        <Input
          value={value}
          className={`form-control ${props.className}`}
          autoFocus
          onChange={(e: any) => updateValue(e.target.value)}
          disabled={isLoading}
        />
        <div className="input-group-append">
          <button
            onClick={() => updateEditing(false)}
            className="btn btn-secondary d-flex align-items-center"
            disabled={isLoading}
            type="reset"
          >
            <span>Cancel</span>
          </button>
          <button
            onClick={handleSave}
            className="btn btn-primary d-flex align-items-center"
            disabled={isLoading}
            type="submit"
          >
            <span>Save</span>
          </button>
        </div>
      </form>
    )
  }

  return React.createElement(props.tagLevel, {
    className: `mb-3 ${props.className}`,
    style: { fontSize: `${fontSize}rem` },
  }, [
    <span key={1}>{value}</span>,
    <a
      key={2}
      href="#"
      className="ml-2 d-inline-block align-middle"
      onClick={() => updateEditing(true)}
    >
      <i className="material-icons">edit</i>
    </a>
  ])
}