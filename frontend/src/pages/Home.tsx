import * as React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const schema = gql`
  query {
    users {
      id
    }
  }
`

interface User {
  id: number
}

export default function Home () {
  const { loading, error, data } = useQuery(schema, { variables: {} })

  if (loading) { return 'loading' }
  if (error) { return 'error' }

  return (
    <div>
      Home
      <Link to="/logout">logout</Link>
      {data.users.map((user: User, i: number) => <div key={i}>user {user.id}</div>)}
    </div>
  )
}