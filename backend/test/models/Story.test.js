describe('Story', () => {
  afterEach(async () => {
    const db = require('../../app/models')
    await db.Project.destroy({ truncate: true, restartIdentity: true })
    await db.Story.destroy({ truncate: true, restartIdentity: true })
  })

  describe('associations', () => {
    it('belongs to project', async () => {
      const db = require('../../app/models')
      const project = await db.Project.create({ name: 'example' })
      expect(await db.Story.count()).toEqual(0)
      const story = await project.createStory({
        title: 'example',
        state: 'unstarted',
        requesterId: 1,
      })
      expect(await db.Story.count()).toEqual(1)
      expect(story.projectId).toEqual(project.id)
      const project2 = await story.getProject()
      expect(project2.id).toEqual(project.id)
    })
  })
})