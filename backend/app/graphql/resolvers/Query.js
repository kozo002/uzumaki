const { EXPECTED_OPTIONS_KEY } = require('dataloader-sequelize')

module.exports = {
  organizations: async (parent, args, { user }, info) => {
    return await user.getOrganizations()
  },

  organization: (parent, { id }, { user, db }, info) => {
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