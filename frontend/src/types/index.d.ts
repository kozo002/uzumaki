import { FormikProps } from 'formik'
import { StoryState, StoryType } from '@/models/Story'
import { Day } from '@/models/Project'
import { reducers } from '@/store'

declare global {
  export type ID = number

  type AppStateT = ReturnType<typeof reducers>

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

  interface IterationDataI {
    startDay: Date
    endDay: Date
    count: number
  }

  type StoryT = {
    id: ID,
    title: string,
    description?: string | null,
    state: StoryState,
    type: StoryType,
    points: number,
    requester: UserT,
    inIcebox: boolean,
    prevId: number | null,
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
    inIcebox: boolean,
    prevId: number | null,
    createdAt: string,
    updatedAt: string,
  }
  interface UpdateStoryPayloadI {
    updateStory: StoryPayloadT
  }
  interface StoriesParametersI {
    projectId: number
    ids: number[]
    inputs: StoryInputI[]
  }
  interface StoryInputI {
    title?: string
    description?: string
    state?: string
    type?: string
    points?: number
    requesterId?: number
    inIcebox?: boolean
    prevId?: number | null
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