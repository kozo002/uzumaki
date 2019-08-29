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
          className="btn btn-sm btn-light"
          onClick={props.onStart}
        >
          START
        </button>
      )
    case StoryState.STARTED:
      return (
        <button
          className="btn btn-sm btn-primary"
          onClick={props.onFinish}
        >
          FINISH
        </button>
      )
    case StoryState.FINISHED:
      return (
        <button
          className="btn btn-sm btn-warning text-white"
          onClick={props.onDeliver}
        >
          DELIVER
        </button>
      )
    case StoryState.DELIVERED:
      return (
        <div className="btn-group">
          <button
            className="btn btn-sm btn-success"
            onClick={props.onAccept}
          >
            ACCEPT
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={props.onReject}
          >
            REJECT
          </button>
        </div>
      )
    case StoryState.REJECTED:
      return (
        <button
          className="btn btn-sm btn-info"
          onClick={props.onRestart}
        >
          RESTART
        </button>
      )
    case StoryState.ACCEPTED:
      return <>&nbsp;</>
  }
}