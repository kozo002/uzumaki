import * as React from 'react'

import StoryState from '@/models/StoryState'

interface Props {
  state: StoryState,
  onStart: () => void,
  onFinish: () => void,
  onDeliver: () => void,
  onAccept: () => void,
  onReject: () => void,
  onRestart: () => void,
}

export default function StateButton (props: Props) {
  switch (props.state) {
    case StoryState.UNSTARTED:
      return (
        <button
          className="btn btn-sm btn-secondary"
          onClick={props.onStart}
        >
          Start
        </button>
      )
    case StoryState.STARTED:
      return (
        <button
          className="btn btn-sm btn-primary"
          onClick={props.onFinish}
        >
          Finish
        </button>
      )
    case StoryState.FINISHED:
      return (
        <button
          className="btn btn-sm btn-warning text-white"
          onClick={props.onDeliver}
        >
          Deliver
        </button>
      )
    case StoryState.DELIVERED:
      return (
        <div className="btn-group">
          <button
            className="btn btn-sm btn-success"
            onClick={props.onAccept}
          >
            Accept
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={props.onReject}
          >
            Reject
          </button>
        </div>
      )
    case StoryState.REJECTED:
      return (
        <button
          className="btn btn-sm btn-info"
          onClick={props.onRestart}
        >
          Restart
        </button>
      )
    case StoryState.ACCEPTED:
      return <>&nbsp;</>
  }
}