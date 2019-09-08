import * as React from 'react'
import Markdown from 'react-markdown'

import Story from '@/models/Story'
import StoryState from '@/models/StoryState'
import EditableHeading from '@/components/EditableHeading'
import StateButton from '@/components/Story/StateButton'
import TypeIcon from '@/components/Story/TypeIcon'

type Props = {
  story: Story,
  onUpdate: (story: Story, input: StoryInputI) => Promise<any>,
}

export default function Detail (props: Props) {
  const { story, onUpdate } = props

  return (
    <article>
      <EditableHeading
        value={story.title}
        tagLevel="h1"
        onSave={(title: string) => onUpdate(story, { title })}
      />

      <div className="d-flex">
        <table className="table table-sm mb-3 mr-2" style={{ width: '50%' }}>
          <tbody>
            <tr>
              <th>Story Type</th>
              <td>
                <TypeIcon
                  type={story.type}
                />
                {story.type}
              </td>
            </tr>
            <tr>
              <th>Points</th>
              <td>
                {story.points === null ? (
                  <span className="text-secondary">No Points</span>
                ) : story.points}
              </td>
            </tr>
            <tr>
              <th>Requester</th>
              <td></td>
            </tr>
            <tr>
              <th>Owner</th>
              <td></td>
            </tr>
          </tbody>
        </table>
        
        <table className="table table-sm ml-2" style={{ width: '50%' }}>
          <tbody>
            <tr>
              <th>State</th>
              <td>
                <StateButton
                  state={story.state}
                  onChange={(state: StoryState) => onUpdate(story, { state })}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="card-body">
          <Markdown source={story.description} />
        </div>
      </div>
    </article>
  )
}