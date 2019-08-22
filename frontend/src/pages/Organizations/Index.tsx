import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useDispatch } from 'react-redux'

import OrganizationList from '@/components/Organization/List'
import MainContainer from '@/components/MainContainer'
import { setTitle } from '@/store/modules/title'
const OrganizationsQuery = require('@/graphql/Query/Organizations.graphql')

export default function Index () {
  const { loading, error, data } = useQuery(OrganizationsQuery)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(setTitle({ windowTitle: 'Organizations' }))
  })

  return (
    <MainContainer>
      {loading && <div>loading...</div>}
      {!loading && <OrganizationList organizations={data.organizations} />}
    </MainContainer>
  )
}