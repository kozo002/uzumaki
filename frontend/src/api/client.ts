const { default: axios } = require('axios')

const instance = axios.create({
  baseURL: process.env.API_ORIGIN,
})

export default instance