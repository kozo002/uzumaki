import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'

import MainContainer from '@/components/MainContainer'
import OrganizationForm from '@/components/Organization/Form'
import AlertError from '@/components/AlertError'
import OrganizationFormContainer from '@/containers/OrganizationForm'
import * as r from '@/helpers/Route'
const OrganizationQuery = require('@/graphql/Query/Organization.graphql') 

type Props = {
  history: RouteHistory,
  match: RouteMatch,
}

export default function Edit (props: Props) {
  const organizationId = parseInt(props.match.params.organizationId)

  const { loading, error, data } = useQuery(OrganizationQuery, {
    variables: { id: organizationId }
  })

  const handleSucceeded = () => {
    props.history.push(r.indexOrganizationsPath())
  }
  
  let content: React.ReactNode = <AlertError>Cannot found organization</AlertError>
  if (loading) { content = 'loading...' }
  if (error) {
    console.error(error)
    content = <AlertError>{error.message}</AlertError>
  }

  if (data.organization) {
    content = (
      <OrganizationFormContainer
        title="Edit organization"
        organization={data.organization}
        component={OrganizationForm}
        onSucceeded={handleSucceeded}
      />
    )
  }

  return <MainContainer>{content}</MainContainer>
}