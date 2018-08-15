import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('./components/user')
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('./components/category/ListTab.vue')
    },
    {
      path: '/categoryAdd',
      name: 'categoryAdd',
      component: () => import('./components/category/AddTab.vue')
    },
    {
      path: '/content',
      name: 'content',
      component: () => import('./views/Content.vue')
    },
    {
      path: '/contentAdd',
      name: 'contentAdd',
      component: () => import('./views/ContentAdd.vue')
    },
  ]
})
