import Storage from './Strorage'

export default class Session {
  static get isLoggedIn (): boolean {
    return !!Storage.load('token')
  }

  static login (token: string) {
    Storage.save('token', token)
  }

  static logout () {
    Storage.delete('token')
  }
}