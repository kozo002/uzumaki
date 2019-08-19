import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'

import OrganizationList from '@/components/Organization/List'
import MainContainer from '@/components/MainContainer'
const OrganizationsQuery = require('@/graphql/Query/Organizations.graphql')

export default function Organizations () {
  const { loading, error, data } = useQuery(OrganizationsQuery)

  return (
    <MainContainer>
      {loading && <div>loading...</div>}
      {!loading && <OrganizationList organizations={data.organizations} />}
    </MainContainer>
  )
}