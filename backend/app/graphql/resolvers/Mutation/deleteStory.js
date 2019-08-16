const { ForbiddenError } = require('apollo-server-express')

module.exports = async (parent, args, context, info) => {
  const { projectId, id } = args
  const { user, db } = context
  const story = await db.Story.findOneBelonggingToUser({
    projectId,
    userId: user.id,
    id,
  })
  if (!story) {
    throw new ForbiddenError('The story does not belong to the project')
  }
  await story.destroy()
  return id
}