import * as React from 'react'
import styled from 'styled-components'

import StateButton from '@/components/Story/StateButton'
import TypeIcon from '@/components/Story/TypeIcon'
import Points from '@/components/Story/Points'
import Story from '@/models/Story'

const Wrapper = styled.article.attrs({
  className: 'card card-default',
})`
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
}>`
  border-radius: 8px;

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

interface Props {
  story: Story
  icebox?: boolean
  current?: boolean
}

export default function Card (props: Props) {  
  const { story } = props
  const handleSelectPoints = (points: number) => {
    console.log({ points })
  }

  return (
    <Wrapper>
      <Body
        icebox={props.icebox}
        current={props.current}
      >
        <Title>{story.title}</Title>
        <div className="d-flex justify-content-between align-items-center">
          <TypeIcon type={story.type} />
          <div className="d-flex align-items-center"> 
            <Points points={story.points} onSelectPoints={handleSelectPoints} />
            {story.points != null && (
              <>
                &nbsp;&nbsp;
                <StateButton
                  state={story.state}
                  onStart={() => console.log('start')}
                  onFinish={() => console.log('finish')}
                  onDeliver={() => console.log('deliver')}
                  onAccept={() => console.log('accept')}
                  onReject={() => console.log('reject')}
                  onRestart={() => console.log('restart')}
                />
              </>
            )}
          </div>
        </div>
      </Body>
    </Wrapper>
  )
}