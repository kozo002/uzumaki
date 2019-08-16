const { ForbiddenError, UserInputError } = require('apollo-server-express')
const updateProject = require('@/app/graphql/resolvers/Mutation/updateProject')

describe('updateProject', () => {
  describe('when target project belongs to the user', () => {
    describe('when the args are valid', () => {
      it('updates the project', async () => {
        const db = require('@/app/models')
        const user = await db.User.create({
          name: 'example',
          email: 'example@example.com',
          githubId: 1,
        })
        const organization = await user.createOrganization({ name: 'example' })
        const project = await organization.createProject({ name: 'example' })
        const dummyArgs = {
          id: project.id,
          name: 'updated name',
          description: 'updated description',
        }
        const dummyContext = { user, db }
        expect(await db.Project.count()).toEqual(1)
        const updatedProject = await updateProject(null, dummyArgs, dummyContext)
        expect(updatedProject.name).toEqual(dummyArgs.name)
        expect(updatedProject.description).toEqual(dummyArgs.description)
        expect(await db.Project.count()).toEqual(1)
      })
    })

    describe('when the args are not valid', () => {
      it('throws UserInputError', async () => {
        const db = require('@/app/models')
        const user = await db.User.create({
          name: 'example',
          email: 'example@example.com',
          githubId: 1,
        })
        const organization = await user.createOrganization({ name: 'example' })
        const project = await organization.createProject({ name: 'example' })
        const dummyArgs = {
          id: project.id,
          name: '',
          description: 'updated description',
        }
        const dummyContext = { user, db }
        try {
          await updateProject(null, dummyArgs, dummyContext)
        } catch (err) {
          expect(err).toBeInstanceOf(UserInputError)
        }
      })
    })
  })

  describe('when target project does not belong to the user', () => {
    it('throws ForbiddenError', async () => {
      const db = require('@/app/models')
      const user = await db.User.create({
        name: 'example',
        email: 'example@example.com',
        githubId: 1,
      })
      const user2 = await db.User.create({
        name: 'example 2',
        email: 'example2@example.com',
        githubId: 2,
      })
      const organization = await user2.createOrganization({ name: 'example' })
      const project = await organization.createProject({ name: 'example' })
      const dummyArgs = {
        id: project.id,
        name: 'updated name',
        description: 'updated description',
      }
      const dummyContext = { user, db }
      try {
        await updateProject(null, dummyArgs, dummyContext)
      } catch (err) {
        expect(err).toBeInstanceOf(ForbiddenError)
      }
    })
  })
})