const { ForbiddenError, UserInputError } = require('apollo-server-express')
const Mutation = require('../../../app/graphql/resolvers/Mutation')

describe('Mutation', () => {
  afterEach(async () => {
    const db = require('../../../app/models')
    await db.User.destroy({ truncate: true, restartIdentity: true })
    await db.Organization.destroy({ truncate: true, restartIdentity: true })
    await db.OrganizationUserMembership.destroy({ truncate: true, restartIdentity: true })
  })

  describe('updateOrganization', () => {
    describe('when target organization belongs to the user', () => {
      describe('when the args are valid', () => {
        it('updates successfully', async () => {
          const db = require('../../../app/models')
          const user = await db.User.create({
            name: 'example',
            email: 'example@example.com',
            githubId: 1,
          })
          const organization = await user.createOrganization({ name: 'example' })
          const dummyArgs = {
            id: organization.id,
            name: 'updated name',
            description: 'updated description',
          }
          const dummyContext = {
            user,
            db,
          }
          const updated = await Mutation.updateOrganization(null, dummyArgs, dummyContext)
          expect(updated.name).toEqual(dummyArgs.name)
          expect(updated.description).toEqual(dummyArgs.description)
        })
      })

      describe('when the args are not valid', () => {
        it('throws UserInputError', async () => {
          const db = require('../../../app/models')
          const user = await db.User.create({
            name: 'example',
            email: 'example@example.com',
            githubId: 1,
          })
          const organization = await user.createOrganization({ name: 'example' })
          const dummyArgs = {
            id: organization.id,
            name: '',
            description: 'updated description',
          }
          const dummyContext = {
            user,
            db,
          }
          try {
            await Mutation.updateOrganization(null, dummyArgs, dummyContext)
          } catch (err) {
            expect(err).toBeInstanceOf(UserInputError)
          }
          const organization2 = await db.Organization.findOne({ where: { id: organization.id } })
          expect(organization2.name).toEqual(organization.name)
        })
      })
    })

    describe('when target organization does not belong to the user', () => {
      it('throws ForbiddenError', async () => {
        const db = require('../../../app/models')
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
        const organization = await user2.createOrganization({ name: 'example' })
        const dummyArgs = { id: organization.id }
        const dummyContext = { user, db }
        try {
          await Mutation.updateOrganization(null, dummyArgs, dummyContext)
        } catch (err) {
          expect(err).toBeInstanceOf(ForbiddenError)
        }
      })
    })
  })

  describe('createProject', () => {
    describe('when target organization belongs to the user', () => {
      describe('when the args are valid', () => {
        it('creates a new project', async () => {
          const db = require('../../../app/models')
          const user = await db.User.create({
            name: 'example',
            email: 'example@example.com',
            githubId: 1,
          })
          const organization = await user.createOrganization({ name: 'example' })
          const dummyArgs = {
            organizationId: organization.id,
            name: 'example name',
            description: 'example description',
          }
          const dummyContext = { user, db }
          expect(await db.Project.count()).toEqual(0)
          const project = await Mutation.createProject(null, dummyArgs, dummyContext)
          expect(await db.Project.count()).toEqual(1)
          expect(project.name).toEqual('example name')
          expect(project.description).toEqual('example description')
        })
      })

      describe('when the args are not valid', () => {
        it('throws UserInputError', async () => {
          const db = require('../../../app/models')
          const user = await db.User.create({
            name: 'example',
            email: 'example@example.com',
            githubId: 1,
          })
          const organization = await user.createOrganization({ name: 'example' })
          const dummyArgs = {
            organizationId: organization.id,
            name: '',
            description: 'example description',
          }
          const dummyContext = { user, db }
          expect(await db.Project.count()).toEqual(0)
          try {
            await Mutation.createProject(null, dummyArgs, dummyContext)
          } catch (err) {
            expect(err).toBeInstanceOf(UserInputError)
          }
          expect(await db.Project.count()).toEqual(0)
        })
      })
    })

    describe('when target organization does not belong to the user', () => {
      it('throws ForbiddenError', async () => {
        const db = require('../../../app/models')
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
        const dummyArgs = { organizationId: organization.id }
        const dummyContext = { user, db }
        expect(await db.Project.count()).toEqual(0)
        try {
          await Mutation.createProject(null, dummyArgs, dummyContext)
        } catch (err) {
          expect(err).toBeInstanceOf(ForbiddenError)
        }
        expect(await db.Project.count()).toEqual(0)
      })
    })
  })
})