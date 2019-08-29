module.exports = async (parent, args, context, info) => {
  const { projectId, ids, inputs } = args
  const { user, db } = context
  const transaction = await db.sequelize.transaction()
  try {
    const stories = await Promise.all(ids.map(async (id, i) => {
      const story = await db.Story.findOneBelonggingToUser({
        projectId,
        userId: user.id,
        id,
      })
      if (!story) {
        throw new ForbiddenError('The story does not belong to the project')
      }
      return story
    }))
    await Promise.all(stories.map((it, i) => it.update(inputs[i])))
    await transaction.commit()
    return stories
  } catch (err) {
    await transaction.rollback()
    throw err
  }
}