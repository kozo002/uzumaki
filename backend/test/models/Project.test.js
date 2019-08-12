describe('Project', () => {
  it('has many organizations', async () => {
    const { Project, OrganizationProjectOwnership } = require('../../app/models')
    const project = await Project.create({ name: 'example project', description: 'example desc' })
    const organization = await project.createOrganization({ name: 'example organization', description: 'example desc' })
    expect(organization).not.toBeNull()
    const ownership = await OrganizationProjectOwnership.findOne({ where: { projectId: project.id } })
    expect(ownership).not.toBeNull()
  })
})