export default {
  decode (): { [key: string]: string } {
    return window.location.search
      .slice(1)
      .split('&')
      .map(it => it.split('='))
      .reduce((acc, pair) => ({
        ...acc,
        [decodeURIComponent(pair[0])]: decodeURIComponent(pair[1]),
      }), {})
  },

  encode (obj: { [key: string]: any }): string {
    return '?' + Object.keys(obj)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
      .join('&')
  }
}