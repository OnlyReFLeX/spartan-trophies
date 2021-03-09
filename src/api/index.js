import axios from 'axios'

const adapter = axios.create({
  baseURL: process.env.BASE_API_URI,
  headers: {
    Accept: 'application/json'
  }
})

const backend = {
  trophies: () => adapter.get('/zahod/membership/trophies')
}

export { backend }
