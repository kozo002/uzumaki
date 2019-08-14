const { EXPECTED_OPTIONS_KEY } = require('dataloader-sequelize')

module.exports = {
  organizations: async (parent, args, { user }, info) => {
    return await user.getOrganizations()
  },

  organization: (parent, { id }, { user, db }, info) => {
    return db.Organization.findOneBelonggingToUser({ id, userId: user.id })
  },

  project: (parent, { id }, { user, db }, info) => {
    return db.Project.findOneBelonggingToUser({
      id,
      userId: user.id
    })
  }
}