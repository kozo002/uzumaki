import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'

const meQuery = require('@/graphql/Query/Me.graphql')

type Props = {
  render: (user: UserT) => React.ReactElement,
}

export default function CurrentUser (props: Props) {
  const { loading, error, data } = useQuery(meQuery)
  if (loading) { return null }
  if (error) { console.error(error); return null }
  if (!data.me) { console.error('Cannot found current user'); return null }
  return props.render(data.me)
}