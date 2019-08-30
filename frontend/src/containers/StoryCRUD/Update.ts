import Story from '@/models/Story'
import StoryCollection from '@/models/StoryCollection'

interface Injection {
  addLoading: (id: number) => void
  removeLoading: (id: number) => void
  current: StoryCollection
  icebox: StoryCollection
  backlog: StoryCollection
  requestUpdate: (stories: Story[], inputs: StoryInputI[]) => Promise<void>
}

type Result = (story: Story, input: StoryInputI) => Promise<void>

export default function Update (injection: Injection): Result {
  const {
    addLoading,
    removeLoading,
    current,
    backlog,
    icebox,
    requestUpdate,
  } = injection

  return async (story: Story, input: StoryInputI) => {
    addLoading(story.id)

    if (story.willStart(input)) {
      const distPrevStory = current.lastStory
      input.prevId = distPrevStory ? distPrevStory.id : null
      let prevStory: Story
      let nextStory: Story
      if (story.inIcebox) {
        input.inIcebox = false
        prevStory = icebox.findPrevStory(story)
        nextStory = icebox.findNextStory(story)
      } else {
        prevStory = backlog.findPrevStory(story)
        nextStory = backlog.findNextStory(story)
      }
      let stories: Story[] = [story]
      let inputs: StoryInputI[] = [input]
      if (nextStory) {
        let nextStoryInput = { prevId: prevStory ? prevStory.id : null }
        stories.push(nextStory)
        inputs.push(nextStoryInput)
      }
      await requestUpdate(stories, inputs)
    }
    else if (story.willAccept(input)) {
      input.prevId = null
      const prevStory = current.findPrevStory(story)
      const nextStory = current.findNextStory(story)
      let stories: Story[] = [story]
      let inputs: StoryInputI[] = [input]
      if (nextStory) {
        const nextStoryInput = { prevId: prevStory ? prevStory.id : null }
        stories.push(nextStory)
        inputs.push(nextStoryInput)
      }
      await requestUpdate(stories, inputs)
    }
    // FINISH, DELIVER, REJECT, RESTART
    else {
      await requestUpdate([story], [input])
    }

    removeLoading(story.id)
  }
}