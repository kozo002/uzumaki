
const { ForbiddenError } = require('apollo-server-express')
const deleteStory = require('@/app/graphql/resolvers/Mutation/deleteStory')

describe('deleteStory', () => {
  describe('when parent project belongs to the user', () => {
    describe('when the story belongs to the project', () => {
      it('deletes the story', async () => {
        const db = require('@/app/models')
        const user = await db.User.create({
          name: 'example',
          email: 'example@example.com',
          githubId: 1,
        })
        const organization = await user.createOrganization({ name: 'example' })
        const project = await organization.createProject({ name: 'example' })
        const story = await project.createStory({
          title: 'example',
          state: 'UNSTARTED',
          requesterId: user.id,
        })
        const dummyArgs = {
          projectId: project.id,
          id: story.id,
        }
        const dummyContext = { user, db }
        expect(await db.Story.count()).toEqual(1)
        await deleteStory(null, dummyArgs, dummyContext)
        expect(await db.Story.count()).toEqual(0)
      })
    })

    describe('when the story does not belong to the project', () => {
      it('throws ForbiddenError', async () => {
        const db = require('@/app/models')
        const user = await db.User.create({
          name: 'example',
          email: 'example@example.com',
          githubId: 1,
        })
        const user2 = await db.User.create({
          name: 'example',
          email: 'example@example.com',
          githubId: 1,
        })
        const organization = await user.createOrganization({ name: 'example' })
        const project = await organization.createProject({ name: 'example' })
        const organization2 = await user2.createOrganization({ name: 'example' })
        const project2 = await organization2.createProject({ name: 'example' })
        const story = await project.createStory({
          title: 'example',
          state: 'UNSTARTED',
          requesterId: user.id,
        })
        const dummyArgs = {
          projectId: project2.id,
          id: story.id,
        }
        const dummyContext = { user, db }
        expect(await db.Story.count()).toEqual(1)
        try {
          await deleteStory(null, dummyArgs, dummyContext)
        } catch (err) {
          expect(err).toBeInstanceOf(ForbiddenError)
        }
        expect(await db.Story.count()).toEqual(1)
      })
    })
  })

  describe('when parent project does not belong to the user', () => {
    it('throws ForbiddenError', async () => {
      const db = require('@/app/models')
      const user = await db.User.create({
        name: 'example',
        email: 'example@example.com',
        githubId: 1,
      })
      const user2 = await db.User.create({
        name: 'example',
        email: 'example@example.com',
        githubId: 1,
      })
      const organization2 = await user2.createOrganization({ name: 'example' })
      const project2 = await organization2.createProject({ name: 'example' })
      const story2 = await project2.createStory({
        title: 'example',
        state: 'UNSTARTED',
        requesterId: user.id,
      })
      const dummyArgs = {
        projectId: project2.id,
        id: story2.id,
      }
      const dummyContext = { user, db }
      expect(await db.Story.count()).toEqual(1)
      try {
        await deleteStory(null, dummyArgs, dummyContext)
      } catch (err) {
        expect(err).toBeInstanceOf(ForbiddenError)
      }
      expect(await db.Story.count()).toEqual(1)
    })
  })
})