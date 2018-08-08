import Vue from 'vue'
import Vuex from 'vuex'
import cache from '@/cache'
import router from '@/router'

Vue.use(Vuex)

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

export default new Vuex.Store({
  state: {
    hasLogined: false,
  },
  mutations: {
    [LOGIN] (state) {
      state.hasLogined = true
    },
    [LOGOUT](state) {
      state.hasLogined = false
    }
  },
  actions: {
    login({ commit }, { username }) {
      cache.username = username
      commit(LOGIN)
    },
    logout ({ commit }) {
      cache.username = ''
      commit(LOGOUT)
      router.replace('/')
    }
  }
})
