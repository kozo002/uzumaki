import client from './client'

export function verify(token: string) {
  return client.get('/auth/verification', { params: { token } })
}