import { FormikProps } from 'formik'
import { StoryState, StoryType } from '@/models/Story'
import { Day } from '@/models/Project'

declare global {
  export type ID = number

  type UserT = {
    id: ID,
    name: string,
  }
  type UserPayloadT = {
    id: string,
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
    startIterationsOn: Day,
    iterationLength: number,
    velocity: number,
    createdAt: Date,
    updatedAt: Date,
  }
  type ProjectPayloadT = {
    id: string,
    name: string,
    description: string | null,
    startIterationsOn: string,
    iterationLength: number,
    velocity: number,
    createdAt: string,
    updatedAt: string,
  }
  type ProjectInputT = {
    id?: number,
    name: string,
    description: string | null,
  }
  type ProjectFormikPropsT = FormikProps<ProjectInputT>
  type CreateProjectPayload = {
    createProject: ProjectPayloadT
  }
  type UpdateProjectPayload = {
    updateProject: ProjectPayloadT
  }

  type StoryT = {
    id: ID,
    title: string,
    description?: string | null,
    state: StoryState,
    type: StoryType,
    points: number,
    requester: UserT,
    createdAt: Date,
    updatedAt: Date,
  }
  type StoryPayloadT = {
    id: string,
    title: sting
    description: string | null,
    state: string,
    type: string,
    points: number,
    requester: UserPayloadT,
    createdAt: string,
    updatedAt: string,
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