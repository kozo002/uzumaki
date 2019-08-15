const { ForbiddenError, UserInputError } = require('apollo-server-express')
const { ValidationError } = require('sequelize')

module.exports = async (parent, args, context, info) => {
  const { projectId, input } = args
  const { user, db } = context
  const project = await db.Project.findOneBelonggingToUser({ id: projectId, userId: user.id })
  if (!project) {
    throw new ForbiddenError('You do not belong to the specified project')
  }
  let story
  try {
    story = await project.createStory(input)
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new UserInputError(err.message)
    }
    throw err
  }
  return story
}