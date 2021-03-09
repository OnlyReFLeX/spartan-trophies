import { backend } from 'src/api'

export default {
  namespaced: true,
  state: {
    trophies: []
  },
  mutations: {
    SET_TROPHIES (store, data) {
      store.trophies = data
    }
  },
  actions: {
    getTrophies ({ commit }) {
      return new Promise((resolve, reject) => {
        backend.trophies().then((response) => {
          commit('SET_TROPHIES', response.data)
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
      })
    }
  },
  getters: {
    trophies: state => state.trophies
  }
}
