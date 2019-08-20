import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'

import Pipelines from '@/components/Project/Pipelines'
import MainContainer from '@/components/MainContainer'
import AlertError from '@/components/AlertError'
import { convert } from '@/models/Story'
const storiesQuery = require('@/graphql/Query/Stories.graphql')

type Props = {
  match: RouteMatch,
}

export default function Show (props: Props) {
  const organizationId = parseInt(props.match.params.organizationId)
  const projectId = parseInt(props.match.params.projectId)

  const { loading, error, data } = useQuery(storiesQuery, {
    variables: { projectId }
  })

  if (loading) {
    return <>'loading...'</>
  }

  if (error) {
    return (
      <MainContainer>
        <AlertError>{error.message}</AlertError>
      </MainContainer>
    )
  }

  const stories: Array<StoryT> = data.stories.map(convert)

  return (
    <Pipelines stories={stories} />
  )
}