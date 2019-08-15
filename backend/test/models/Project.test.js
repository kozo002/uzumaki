const { ValidationError } = require('sequelize')

describe('Project', () => {
  describe('validations', () => {
    describe('name', () => {
      it('must not be null', async () => {
        const { Project } = require('../../app/models')
        try {
          await Project.create({ name: null })
        } catch (err) {
          expect(err).toBeInstanceOf(ValidationError)
        }
        const count = await Project.count()
        expect(count).toEqual(0)
      })
    })
  })

  it('has many organizations', async () => {
    const { Project, OrganizationProjectOwnership } = require('../../app/models')
    const project = await Project.create({ name: 'example project', description: 'example desc' })
    const organization = await project.createOrganization({ name: 'example organization', description: 'example desc' })
    expect(organization).not.toBeNull()
    const ownership = await OrganizationProjectOwnership.findOne({ where: { projectId: project.id } })
    expect(ownership).not.toBeNull()
  })
})