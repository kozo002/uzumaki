const prefix = 'uzumaki:'

class Storage {
  save (key: string, value: string) {
    window.localStorage.setItem(`${prefix}${key}`, value)
  }

  load (key: string): string | null {
    return window.localStorage.getItem(`${prefix}${key}`)
  }

  delete (key: string) {
    window.localStorage.removeItem(`${prefix}${key}`)
  }
}

export default new Storage()