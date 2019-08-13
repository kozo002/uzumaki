const { EXPECTED_OPTIONS_KEY } = require('dataloader-sequelize')

module.exports = {
  users: (parent, args, { db, eok }, info) =>
    db.User.findAll({ [EXPECTED_OPTIONS_KEY]: eok }),

  user: (parent, { id }, { db, eok }, info) =>
    db.User.findOne({ where: { id } }, { [EXPECTED_OPTIONS_KEY]: eok }),

  organizations: async (parent, { userId }, { db, eok }, info) => {
    const user = await db.User.findOne({ where: { id: userId } }, { [EXPECTED_OPTIONS_KEY]: eok })
    if (!user) { return [] }
    return await user.getOrganizations()
  },

  organization: async (parent, { userId, id }, { db, eok }, info) => {
    const membership = await db.OrganizationUserMembership.findOne({ where: {
      userId,
      organizationId: id,
    } })
    if (!membership) { return null }
    return await membership.getOrganization()
  },
}