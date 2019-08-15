const { ForbiddenError, UserInputError } = require('apollo-server-express')
const { ValidationError } = require('sequelize')

module.exports = {
  updateOrganization: async (parent, args, context, info) => {
    const { id, name, description } = args
    const { user, db } = context
    const organization = await db.Organization.findOneBelonggingToUser({ id, userId: user.id })
    if (!organization) {
      throw new ForbiddenError('You do not belong to the specified organization')
    }
    try {
      await organization.update({ name, description })
    } catch (err) {
      if (err instanceof ValidationError) {
        throw new UserInputError(err.message)
      }
      throw err
    }
    return organization
  }
}