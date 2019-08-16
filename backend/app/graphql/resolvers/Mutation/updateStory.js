const { ForbiddenError, UserInputError } = require('apollo-server-express')
const { ValidationError } = require('sequelize')

module.exports = async (parent, args, context, info) => {
  const { projectId, input } = args
  const { user, db } = context
  const story = await db.Story.findOneBelonggingToUser({
    projectId,
    userId: user.id,
    id: input.id,
  })
  if (!story) {
    throw new ForbiddenError('The story does not belong to the project')
  }
  try {
    await story.update(input)
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new UserInputError(err.message)
    }
    throw err
  }
  return story
}