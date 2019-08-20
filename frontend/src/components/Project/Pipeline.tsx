import * as React from 'react'
import styled from 'styled-components'

type WrapperProps = {
  width: number,
}
const Wrapper = styled.div<WrapperProps>`
  ${props => `width: ${props.width}px`}
  height: 100%;
  margin-right: 16px;

  &:last-child {
    margin-right: 0;
  }
`

const Header = styled.header.attrs({
  className: 'text-uppercase',
})`
  padding: 16px 0;
`

export enum PipelineType {
  Current = 'Current Iteration',
  Backlog = 'Backlog',
  Icebox = 'Icebox',
}

type Props = {
  width: number,
  type: PipelineType,
  children?: React.ReactNode,
}

export default function Pipeline (props: Props) {
  return (
    <Wrapper width={props.width}>
      <Header>{props.type}</Header>
      {props.children}
    </Wrapper>
  )
}