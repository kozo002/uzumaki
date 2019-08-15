const { ForbiddenError, UserInputError } = require('apollo-server-express')
const { ValidationError } = require('sequelize')

module.exports = async (parent, args, context, info) => {
  const { id, name, description } = args
  const { user, db } = context
  const project = await db.Project.findOneBelonggingToUser({ id, userId: user.id })
  if (!project) {
    throw new ForbiddenError('You do not belong to the specified project')
  }
  try {
    await project.update({ name, description })
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new UserInputError(err.message)
    }
    throw err
  }
  return project
}