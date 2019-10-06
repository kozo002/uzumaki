const { ForbiddenError, UserInputError } = require('apollo-server-express')
const { ValidationError } = require('sequelize')

module.exports = async (parent, args, context, info) => {
  const { projectId, id, input } = args
  const { user, db } = context
  const story = await db.Story.findOneBelonggingToUser({
    projectId,
    userId: user.id,
    id,
  })
  if (!story) {
    throw new ForbiddenError('The story does not belong to the project')
  }
  const transaction = await db.sequelize.transaction()
  try {
    if (story.willStart(input)) {
      story.updatePrevIdOfNextOne(transaction)
    }
    await story.update(input, { transaction })
    await transaction.commit()
  } catch (err) {
    await transaction.rollback()
    if (err instanceof ValidationError) {
      throw new UserInputError(err.message)
    }
    throw err
  }
  return story
}