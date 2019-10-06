describe('Story', () => {
  afterEach(async () => {
    const db = require('@/app/models')
    await db.Project.destroy({ truncate: true, restartIdentity: true })
    await db.Story.destroy({ truncate: true, restartIdentity: true })
  })

  describe('associations', () => {
    it('belongs to project', async () => {
      const db = require('@/app/models')
      const project = await db.Project.create({ name: 'example' })
      expect(await db.Story.count()).toEqual(0)
      const story = await project.createStory({
        title: 'example',
        state: 'UNSTARTED',
        requesterId: 1,
      })
      expect(await db.Story.count()).toEqual(1)
      expect(story.projectId).toEqual(project.id)
      const project2 = await story.getProject()
      expect(project2.id).toEqual(project.id)
    })
  })

  describe('updatePrevIdOfNextOne', () => {
    describe('when the story has prevId', () => {
      it('updates prevId of next one to id of prev one', async () => {
        const db = require('@/app/models')
        const project = await db.Project.create({ name: 'example' })
        const first = await project.createStory({ prevId: null, title: 'example', state: 'UNSTARTED', requesterId: 0 })
        const second = await project.createStory({ prevId: first.id, title: 'example', state: 'UNSTARTED', requesterId: 0 })
        const third = await project.createStory({ prevId: second.id, title: 'example', state: 'UNSTARTED', requesterId: 0 })
        await second.updatePrevIdOfNextOne()
        await third.reload()
        expect(third.prevId).toEqual(first.id)
      })
    })

    describe('when the story does not have prevId', () => {
      it('updates prevId of next one to null', async () => {
        const db = require('@/app/models')
        const project = await db.Project.create({ name: 'example' })
        const first = await project.createStory({ prevId: null, title: 'example', state: 'UNSTARTED', requesterId: 0 })
        const second = await project.createStory({ prevId: first.id, title: 'example', state: 'UNSTARTED', requesterId: 0 })
        await first.updatePrevIdOfNextOne()
        await second.reload()
        expect(second.prevId).toBeNull()
      })
    })

    describe('when the story does not have prevId and next one does not exist', () => {
      let originalUpdate
      const db = require('@/app/models')

      beforeEach(() => {
        originalUpdate = db.Story.prototype.update
        db.Story.prototype.update = jest.fn()
      })

      afterEach(() => {
        db.Story.prototype.update = originalUpdate
      })

      it('does nothing', async () => {
        const project = await db.Project.create({ name: 'test' })
        const story = await project.createStory({
          prevId: null,
          title: 'test story',
          state: 'UNSTARTED',
          requesterId: 0,
        })
        await story.updatePrevIdOfNextOne()
        expect(db.Story.prototype.update).not.toHaveBeenCalled()
      })
    })
  })
})