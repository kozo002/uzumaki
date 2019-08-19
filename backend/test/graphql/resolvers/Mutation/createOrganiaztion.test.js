const { UserInputError } = require('apollo-server-express')
const createOrganization = require('@/app/graphql/resolvers/Mutation/createOrganization')

describe('createOrganization', () => {
  describe('when the args are valid', () => {
    it('creates a new organization', async () => {
      const db = require('@/app/models')
      const user = await db.User.create({
        name: 'example',
        email: 'example@example.com',
        githubId: 1,
      })
      const dummyArgs = {
        name: 'example name',
        description: 'example description',
      }
      const dummyContext = { user, db }
      expect(await db.Organization.count()).toEqual(0)
      const organization = await createOrganization(null, dummyArgs, dummyContext)
      expect(await db.Organization.count()).toEqual(1)
      expect(organization.name).toEqual('example name')
      expect(organization.description).toEqual('example description')
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
      const dummyArgs = {
        name: '',
        description: 'example description',
      }
      const dummyContext = { user, db }
      expect(await db.Organization.count()).toEqual(0)
      try {
        await createOrganization(null, dummyArgs, dummyContext)
      } catch (err) {
        expect(err).toBeInstanceOf(UserInputError)
      }
      expect(await db.Organization.count()).toEqual(0)
    })
  })
})
