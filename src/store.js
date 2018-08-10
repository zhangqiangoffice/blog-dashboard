import Vue from 'vue'
import Vuex from 'vuex'
import cache from '@/cache'
import router from '@/router'
import API from '@/utils/API.js'
import { ALERT_COUNT_DOWN } from '@/utils/values'

Vue.use(Vuex)

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const SHOW_ALERT = 'SHOW_ALERT'
const HIDE_ALERT = 'HIDE_ALERT'

let timer

export default new Vuex.Store({
  state: {
    hasLogined: false,
    isShowingAlert: false,
  },
  mutations: {
    [LOGIN] (state) {
      state.hasLogined = true
    },
    [LOGOUT](state) {
      state.hasLogined = false
    },
    [SHOW_ALERT](state) {
      state.isShowingAlert = true
    },
    [HIDE_ALERT](state) {
      state.isShowingAlert = false
    },
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
    },
    showAlert({ commit, dispatch }, { content, variant }) {
      dispatch({ type: 'hideAlert' })
      cache.alertContent = content
      cache.alertVariant = variant
      commit(SHOW_ALERT)
      timer = setTimeout(() => {
        dispatch({ type: 'hideAlert' })
      }, ALERT_COUNT_DOWN)
    },
    hideAlert({ commit }) {
      commit(HIDE_ALERT)
      cache.alertContent = ''
      cache.alertVariant = null
      timer && clearTimeout(timer)
    }
  }
})
