import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import trophies from './trophies'

const Store = new Vuex.Store({
  modules: {
    trophies
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEBUGGING
})

export default function () {
  return Store
}
