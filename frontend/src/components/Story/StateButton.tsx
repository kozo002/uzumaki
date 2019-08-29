import * as React from 'react'

import StoryState from '@/models/StoryState'

interface Props {
  state: StoryState
  onChange: (state: StoryState) => void
}

export default function StateButton (props: Props) {
  const { state, onChange } = props
  switch (state) {
    case StoryState.UNSTARTED:
      return (
        <button
          className="btn btn-sm btn-light"
          onClick={() => onChange(StoryState.STARTED)}
        >
          START
        </button>
      )
    case StoryState.STARTED:
      return (
        <button
          className="btn btn-sm btn-primary"
          onClick={() => onChange(StoryState.FINISHED)}
        >
          FINISH
        </button>
      )
    case StoryState.FINISHED:
      return (
        <button
          className="btn btn-sm btn-warning text-white"
          onClick={() => onChange(StoryState.DELIVERED)}
        >
          DELIVER
        </button>
      )
    case StoryState.DELIVERED:
      return (
        <div className="btn-group">
          <button
            className="btn btn-sm btn-success"
            onClick={() => onChange(StoryState.ACCEPTED)}
          >
            ACCEPT
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onChange(StoryState.REJECTED)}
          >
            REJECT
          </button>
        </div>
      )
    case StoryState.REJECTED:
      return (
        <button
          className="btn btn-sm btn-info"
          onClick={() => onChange(StoryState.STARTED)}
        >
          RESTART
        </button>
      )
    case StoryState.ACCEPTED:
      return <>&nbsp;</>
  }
}