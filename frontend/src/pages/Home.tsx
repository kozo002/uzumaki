import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'

import OrganizationList from '../components/Organization/List'
const Organizations = require('../graphql/Organizations.graphql') 

export default function Home () {
  const { loading, error, data } = useQuery(Organizations)

  return (
    <div className="container pt-3">
      {loading && <div>loading...</div>}
      {!loading && <OrganizationList organizations={data.organizations} />}
    </div>
  )
}