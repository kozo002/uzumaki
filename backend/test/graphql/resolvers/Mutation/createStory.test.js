const { ForbiddenError, UserInputError } = require('apollo-server-express')
const createStory = require('@/app/graphql/resolvers/Mutation/createStory')

describe('createStory', () => {
  describe('when parent project belongs to the user', () => {
    describe('when the args are valid', () => {
      it('creates a new story', async () => {
        const db = require('@/app/models')
        const user = await db.User.create({
          name: 'example',
          email: 'example@example.com',
          githubId: 1,
        })
        const organization = await user.createOrganization({ name: 'example' })
        const project = await organization.createProject({ name: 'example' })
        const dummyArgs = {
          projectId: project.id,
          input: {
            title: 'example story',
            description: 'example description',
            state: 'unstarted',
            points: 1,
            requesterId: user.id,
          }
        }
        const dummyContext = { user, db }
        expect(await db.Story.count()).toEqual(0)
        const story = await createStory(null, dummyArgs, dummyContext)
        expect(await db.Story.count()).toEqual(1)
        expect(story.projectId).toEqual(project.id)
        expect(story.title).toEqual(dummyArgs.input.title)
        expect(story.description).toEqual(dummyArgs.input.description)
        expect(story.state).toEqual(dummyArgs.input.state)
        expect(story.points).toEqual(dummyArgs.input.points)
        expect(story.requesterId).toEqual(dummyArgs.input.requesterId)
      })
    })

    describe('when the args are not valid', () => {
      it ('throw UserInputError', async () => {
        const db = require('@/app/models')
        const user = await db.User.create({
          name: 'example',
          email: 'example@example.com',
          githubId: 1,
        })
        const organization = await user.createOrganization({ name: 'example' })
        const project = await organization.createProject({ name: 'example' })
        const dummyArgs = {
          projectId: project.id,
          input: {
            title: '',
            description: 'example description',
            state: 'unstarted',
            points: 1,
            requesterId: user.id,
          }
        }
        const dummyContext = { user, db }
        expect(await db.Story.count()).toEqual(0)
        try {
          await createStory(null, dummyArgs, dummyContext)
        } catch (err) {
          expect(err).toBeInstanceOf(UserInputError)
        }
        expect(await db.Story.count()).toEqual(0)
      })
    })
  })

  describe('when parent project does not belong to the user', () => {
    it('throws ForbiddenError', async () => {
      const db = require('@/app/models')
      const user = await db.User.create({
        name: 'example',
        email: 'example@example.com',
        githubid: 1,
      })
      const user2 = await db.User.create({
        name: 'example2',
        email: 'example2@example.com',
        githubId: 1,
      })
      const organization = await user2.createOrganization({ name: 'example' })
      const project = await organization.createProject({ name: 'example' })
      const dummyArgs = {
        projectId: project.id,
        input: {
          title: '',
          description: 'example description',
          state: 'unstarted',
          points: 1,
          requesterId: user.id,
        }
      }
      const dummyContext = { user, db }
      expect(await db.Story.count()).toEqual(0)
      try {
        await createStory(null, dummyArgs, dummyContext)
      } catch (err) {
        expect(err).toBeInstanceOf(ForbiddenError)
      }
      expect(await db.Story.count()).toEqual(0)
    })
  })
})