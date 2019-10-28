const { EXPECTED_OPTIONS_KEY } = require('dataloader-sequelize')
const pubsub = require('../pubsub')
const { STORY_ADDED } = require('../events')

module.exports = {
  me: (parent, args, { user }, info) => {
    return user
  },

  organizations: async (parent, args, { user, db }, info) => {
    const story = await db.Story.findOne({ where: { id: 1 } })
    console.log(pubsub.publish(STORY_ADDED, { storyAdded: story }))
    return await user.getOrganizations({
      order: [['createdAt', 'DESC']]
    })
  },

  organization: async (parent, { id }, { user, db }, info) => {
    return db.Organization.findOneBelonggingToUser({ id, userId: user.id })
  },

  project: (parent, { id }, { user, db }, info) => {
    return db.Project.findOneBelonggingToUser({ id, userId: user.id })
  },

  stories: (parent, { projectId }, { user, db }, info) => {
    return db.Story.findAllBelonggingToUser({ userId: user.id, projectId })
  },

  story: async(parent, { projectId, id }, { user, db }, info) => {
    return db.Story.findOneBelonggingToUser({ userId: user.id, projectId, id })
  },
}