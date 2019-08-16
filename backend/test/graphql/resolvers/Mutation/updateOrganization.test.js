const { ForbiddenError, UserInputError } = require('apollo-server-express')
const updateOrganization = require('@/app/graphql/resolvers/Mutation/updateOrganization')

describe('updateOrganization', () => {
  describe('when target organization belongs to the user', () => {
    describe('when the args are valid', () => {
      it('updates successfully', async () => {
        const db = require('@/app/models')
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
        const updated = await updateOrganization(null, dummyArgs, dummyContext)
        expect(updated.name).toEqual(dummyArgs.name)
        expect(updated.description).toEqual(dummyArgs.description)
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
          await updateOrganization(null, dummyArgs, dummyContext)
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
      const organization = await user2.createOrganization({ name: 'example' })
      const dummyArgs = { id: organization.id }
      const dummyContext = { user, db }
      try {
        await updateOrganization(null, dummyArgs, dummyContext)
      } catch (err) {
        expect(err).toBeInstanceOf(ForbiddenError)
      }
    })
  })
})