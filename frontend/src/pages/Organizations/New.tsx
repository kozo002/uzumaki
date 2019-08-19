import * as React from 'react'

import MainContainer from '@/components/MainContainer'
import OrganizationForm from '@/components/Organization/Form'
import OrganizationFormContainer from '@/containers/OrganizationForm'
import * as r from '@/helpers/Route'

type Props = {
  history: RouteHistory,
}

export default function Edit (props: Props) {
  const handleSucceeded = () => {
    props.history.push(r.indexOrganizationsPath())
  }
  
  return (
    <MainContainer>
      <OrganizationFormContainer
        title="Create a new organization"
        component={OrganizationForm}
        onSucceeded={handleSucceeded}
      />
    </MainContainer>
  )
}