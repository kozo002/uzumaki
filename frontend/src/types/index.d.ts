import { FormikProps } from 'formik'

declare global {
  export type ID = number

  type UserT = {
    id: ID,
    name: string,
  }

  type OrganizationT = {
    id: ID,
    name: string,
    description?: string | null,
    projects: [ProjectT]
  }
  type OrganizationInputT = {
    id?: ID,
    name: string,
    description?: string | null,
  }
  type OrganizationFormikPropsT = FormikProps<OrganizationInputT>
  type CreateOrganizationPayload = {
    createOrganization: OrganizationT
  }
  type UpdateOrganizationPayload = {
    updateOrganization: OrganizationT
  }

  type ProjectT = {
    id: ID,
    name: string,
    description?: string | null,
  }
  type ProjectInputT = {
    id?: number,
    name: string,
    description: string | null,
  }
  type ProjectFormikPropsT = FormikProps<ProjectInputT>
  type CreateProjectPayload = {
    createProject: ProjectT
  }
  type UpdateProjectPayload = {
    updateProject: ProjectT
  }

  type RouteMatch = {
    isExact: boolean,
    params: {
      [key: string]: string
    },
    path: string,
    url: string,
  }
  type RouteHistory = {
    push: Function,
    goBack: Function,
  }
}

declare module "*.graphql" {
  const value: any;
  export default value;
}