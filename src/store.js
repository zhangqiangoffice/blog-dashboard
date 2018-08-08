import Vue from 'vue'
import Vuex from 'vuex'
import cache from '@/cache'
import router from '@/router'
import API from '@/utils/API.js'

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
    loginSuccess({ commit }, { username }) {
      cache.username = username
      commit(LOGIN)
    },
    logoutCompleted ({ commit }) {
      cache.username = ''
      commit(LOGOUT)
      router.replace('/')
    },
    checkLogin ({ dispatch }) {
      return API.checkLogin()
        .then((res) => {
          if (res.data.userInfo) {
            dispatch({
              type: 'loginSuccess',
              username: res.data.userInfo.username
            })
          }
        })
        .catch((err) => {
          API.handleErr(err)
        })
    },
    login({ dispatch }, { username, password }) {
      return API.login(username, password)
        .then((res) => {
          if (!res.data.code) {
            dispatch({
              type: 'loginSuccess',
              username: username
            })
          } else {
            return res.data.message
          }
        })
        .catch((err) => {
          return err.toString()
        })
    },
    logout({ dispatch }) {
      return API.logout()
        .then(res => {
          if (!res.data.code) {
            dispatch({ type: 'logoutCompleted' })
          }
        })
    }
  }
})
