import * as React from 'react'

interface Props {
  children: React.ReactElement
  onClose: () => void
}

export default function Modal (props: Props) {
  React.useEffect(() => {
    if (!document.body.classList.contains('modal-open')) {
      document.body.classList.add('modal-open')
    }
    return () => {
      document.body.classList.remove('modal-open')
    }
  })

  return (
    <>
      <div className="modal-backdrop fade show" />
      <div
        className="modal fade show"
        style={{ display: 'block' }}
        onClick={props.onClose}
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <div className="modal-content">
            <div className="modal-body">
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}