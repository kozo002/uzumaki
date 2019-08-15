const { ValidationError } = require('sequelize')

describe('Organization', () => {
  describe('validations', () => {
    describe('name', () => {
      it('must not be a null', async () => {
        const { Organization } = require('../../app/models')
        try {
          await Organization.create({ name: null })
        } catch (err) {
          expect(err).toBeInstanceOf(ValidationError)
        }
        const count = await Organization.count()
        expect(count).toEqual(0)
      })
    })
  })

  it('has many projects', async () => {
    const { Organization, OrganizationProjectOwnership } = require('../../app/models')
    const organization = await Organization.create({ name: 'example org', description: 'example desc' })
    const project = await organization.createProject({ name: 'example project', description: 'example desc' })
    expect(project).not.toBeNull()
    const ownership = await OrganizationProjectOwnership.findOne({ where: { projectId: project.id } })
    expect(ownership).not.toBeNull()
  })

  it('has many users', async () => {
    const { Organization, OrganizationUserMembership } = require('../../app/models')
    const organization = await Organization.create({ name: 'example org', description: 'example desc' })
    const user = await organization.createUser({ name: 'example user', email: 'example@example.com', githubId: 1 })
    expect(user).not.toBeNull()
    const membership = OrganizationUserMembership.findOne({ where: { userId: user.id } })
    expect(membership).not.toBeNull()
  })
})