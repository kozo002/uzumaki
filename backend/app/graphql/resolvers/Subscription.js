const pubsub = require('../pubsub')
const { STORY_ADDED } = require('../events')

module.exports = {
  storyAdded: {
    subscribe: () => pubsub.asyncIterator([STORY_ADDED])
  },
}