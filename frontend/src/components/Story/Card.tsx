import * as React from 'react'
import styled from 'styled-components'

import TypeIcon from '@/components/Story/TypeIcon'

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
})``

const Title = styled.h1.attrs({
  className: 'card-title h6'
})`
  line-height: 1.5
`

type Props = {
  story: StoryT,
}

export default function Card (props: Props) {  
  const { story } = props
  return (
    <Wrapper>
      <Body>
        <Title>{story.title}</Title>
        <div>
          <TypeIcon type={story.type} />
        </div>
      </Body>
    </Wrapper>
  )
}