import Vue from 'vue'
import Vuex from 'vuex'
import { MUTATION_TYPES } from './utils/values'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hasLogined: false,
    username: '',
  },
  mutations: {
    [MUTATION_TYPES.LOGIN] (state, payload) {
      state.hasLogined = true
      state.username = payload.username
    }
  },
  actions: {

  }
})
