import Vue from 'vue'
import Vuex from 'vuex'
import { MUTATION_TYPES } from './utils/values'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hasLogined: false,
  },
  mutations: {
    [MUTATION_TYPES.LOGIN] (state) {
      state.hasLogined = true
    }
  },
  actions: {

  }
})
