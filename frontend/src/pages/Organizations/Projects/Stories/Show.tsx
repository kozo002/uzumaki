import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Markdown from 'react-markdown'

const storyQuery = require('@/graphql/Query/Story.graphql')

interface Props {
  match: RouteMatch
}

export default function Show (props: Props) {
  const { match: { params: { projectId, storyId } } } = props
  const { loading, error, data } = useQuery(storyQuery, {
    variables: { projectId, id: storyId }
  })

  const { story } = data

  return (
    <div>
      {loading && (
        <div>loading...</div>
      )}
      {error && (
        <div>{error}</div>
      )}
      {story && (
        <div>
          <h5 className="modal-title">{story.title}</h5>
          <Markdown source={story.description} />
        </div>
      )}
    </div>
  )
}