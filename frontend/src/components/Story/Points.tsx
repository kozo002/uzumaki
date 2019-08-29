import * as React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
`

const Number = styled.div.attrs({
  className: 'font-weight-bold'
})`
  opacity: 0.75;
`

function PointButton (props: { points: number, onClick: (points: number) => void }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    props.onClick(props.points)
  }

  return (
    <button
      className="btn btn-sm btn-outline-secondary font-weight-bold"
      onClick={handleClick}
    >
      {props.points}
    </button>
  )
}

interface Props {
  points: number | null
  onSelectPoints: (points: number) => void
}
export default function Points (props: Props) {
  const handleClick = (point: number) => {
    console.log(point)
  }

  return (
    <Wrapper>
      {props.points ? (
        <Number title="points">{props.points}</Number>
      ) : (
        <div className="btn-group">
          <PointButton points={0} onClick={handleClick} />
          <PointButton points={1} onClick={handleClick} />
          <PointButton points={2} onClick={handleClick} />
          <PointButton points={3} onClick={handleClick} />
          <PointButton points={5} onClick={handleClick} />
          <PointButton points={8} onClick={handleClick} />
        </div>
      )}
    </Wrapper>
  )
}