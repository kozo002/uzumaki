export function indexOrganizationsPath() {
  return '/organizations'
}

export function showOrganizationPath(organizationId: number) {
  return `${indexOrganizationsPath()}/${organizationId}`
}

export function editOrganizationPath(organizationId: number) {
  return `${showOrganizationPath(organizationId)}/edit`
}

export function indexProjectsPath(organizationId: number) {
  return `${showOrganizationPath(organizationId)}/projects`
}

export function showProjectPath(organizationId: number, projectId: number) {
  return `${indexProjectsPath(organizationId)}/${projectId}`
}

export function newProjectPath(organizationId: number) {
  return `${indexProjectsPath(organizationId)}/new`
}

export function editProjectPath(organizationId: number, projectId: number) {
  return `${showProjectPath(organizationId, projectId)}/edit`
}