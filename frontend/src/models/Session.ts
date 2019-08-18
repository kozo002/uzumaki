import * as authAPI from '../api/auth'
import Storage from './Strorage'

export default class Session {
  static get isLoggedIn (): boolean {
    return !!Storage.load('token')
  }

  static get token (): string | null {
    return Storage.load('token')
  }

  static async verify() {
    const token = Storage.load('token')
    try {
      await authAPI.verify(token)
    } catch (err) {
      console.error(err)
      this.logout()
      return false
    }
    return true
  }

  static login (token: string) {
    Storage.save('token', token)
  }

  static logout () {
    Storage.delete('token')
  }
}