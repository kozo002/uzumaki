import { FormikProps } from 'formik'

export type ID = number

export type OrganizationT = {
  id: ID,
  name: string,
  description?: string | null,
  projects: [ProjectT]
}

export type ProjectT = {
  id: ID,
  name: string,
  description?: string | null,
}

export type ProjectInputT = {
  id?: number,
  name: string,
  description: string | null,
}
export type ProjectFormikPropsT = FormikProps<ProjectInputT>
export type CreateProjectPayload = {
  createProject: ProjectT
}
export type UpdateProjectPayload = {
  updateProject: ProjectT
}

export type RouteMatch = {
  isExact: boolean,
  params: {
    [key: string]: string
  },
  path: string,
  url: string,
}
export type RouteHistory = {
  push: Function,
  goBack: Function,
}

declare module "*.graphql" {
  const value: any;
  export default value;
}