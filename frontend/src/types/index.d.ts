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

export type RouteMatch = {
  isExact: boolean,
  params: {
    [key: string]: string
  },
  path: string,
  url: string,
}