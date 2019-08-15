const { ForbiddenError, UserInputError } = require('apollo-server-express')
const { ValidationError } = require('sequelize')

module.exports = async (parent, args, context, info) => {
  const { organizationId, name, description } = args
  const { user, db } = context
  const organization = await db.Organization.findOneBelonggingToUser({
    id: organizationId,
    userId: user.id,
  })
  if (!organization) {
    throw new ForbiddenError('You do not belong to the specified organization')
  }
  let project
  try {
    project = await organization.createProject({ name, description })
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new UserInputError(err.message)
    }
    throw err
  }
  return project
}