import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import CacheData from '@/utils/CacheData'
import cache from './cache'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vuexI18n from 'vuex-i18n'
import en from './i18n/en'
import zh from './i18n/zh'

Vue.config.productionTip = false

Vue.use(CacheData, { defaultCache: cache })
Vue.use(BootstrapVue);

Vue.use(vuexI18n.plugin, store);
Vue.i18n.add('en', en);
Vue.i18n.add('zh', zh);
Vue.i18n.set('zh');

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
