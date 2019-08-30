import * as React from 'react'
import styled from 'styled-components'
import FadeLoader from 'react-spinners/FadeLoader'

import StateButton from '@/components/Story/StateButton'
import TypeIcon from '@/components/Story/TypeIcon'
import Points from '@/components/Story/Points'
import Story from '@/models/Story'
import StoryType from '@/models/StoryType'
import StoryState from '@/models/StoryState'

const Wrapper = styled.article.attrs({
  className: 'card card-default',
})`
  position: relative;
  margin: 0 0 16px 0;
  border: 0;
  border-radius: 8px;

  &:last-child {
    margin: 0;
  }
`

const Body = styled.div.attrs({
  className: 'card-body',
})<{
  icebox?: boolean,
  current?: boolean,
  done?: boolean,
}>`
  border-radius: 8px;

  ${props => props.done && `
    background-color: #eefce2;
  `}

  ${props => props.current && `
    background-color: #ffe8d4;
  `}

  ${props => props.icebox && `
    color: #fff;
    background-color: #6d8190;
  `}
`

const Title = styled.h1.attrs({
  className: 'card-title h6'
})`
  line-height: 1.5
`

const LoadingIndicator = styled.div.attrs({
  className: 'd-flex justify-content-center align-items-center',
})`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255,255,255,.5);
`

interface Props {
  story: Story
  done?: boolean
  icebox?: boolean
  current?: boolean
  loading: boolean
  onStateChange: (story: Story, state: StoryState) => void
  onSelectPoints: (story: Story, points: number | null) => void
}

export default function Card (props: Props) {  
  const { story } = props

  const isPointsNeeded = story.type === StoryType.FEATURE
  const isStateButtonNeeded = story.points != null || story.type !== StoryType.FEATURE

  return (
    <Wrapper>
      <Body
        icebox={props.icebox}
        current={props.current}
        done={props.done}
      >
        <Title>{story.title}</Title>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center"> 
            <TypeIcon type={story.type} />
            &nbsp;&nbsp;
            {isPointsNeeded && (
              <Points
                points={story.points}
                onSelectPoints={points => props.onSelectPoints(story, points)}
              />
            )}
          </div>
          {isStateButtonNeeded && (
            <StateButton
              state={story.state}
              onChange={(state: StoryState) => props.onStateChange(story, state)}
            />
          )}
        </div>
      </Body>
      {props.loading && (
        <LoadingIndicator>
          <FadeLoader
            height={10}
            width={5}
            radius={2}
            margin="2px"
            color="#989B9A"
          />
        </LoadingIndicator>
      )}
    </Wrapper>
  )
}