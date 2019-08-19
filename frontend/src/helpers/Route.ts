export function indexProjectsPath(organizationId: number) {
  return `/organizations/${organizationId}/projects`
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