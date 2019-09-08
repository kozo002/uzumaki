import * as React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'

import Detail from '@/components/Story/Detail'
import Story from '@/models/Story'

const storyQuery = require('@/graphql/Query/Story.graphql') 
const updateStoriesMutation = require('@/graphql/Mutation/updateStories.graphql')

interface Props {
  match: RouteMatch
}

export default function Show (props: Props) {
  const { match: { params: { projectId, storyId } } } = props
  const { loading, error, data } = useQuery(storyQuery, {
    variables: { projectId, id: storyId }
  })
  const [updateStories] = useMutation<UpdateStoryPayloadI, StoriesParametersI>(updateStoriesMutation)
  const handleUpdate = (story: Story, input: StoryInputI) => {
    return updateStories({ variables: {
      projectId: parseInt(projectId),
      ids: [story.id],
      inputs: [input]
    } })
  }

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
        <Detail
          story={story}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  )
}