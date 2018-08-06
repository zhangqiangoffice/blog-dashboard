<template>
  <div>
    <NavBar />
    <loading v-if="isChecking" />
    <transition v-else>
      <router-view />
    </transition>
  </div>
</template>

<script>
import NavBar from './components/public/NavBar.vue'
import Loading from './components/public/Loading.vue'
import API from '@/utils/API.js'
import { MUTATION_TYPES } from '@/utils/values'

export default {
  components: {
    NavBar,
    Loading,
  },
  data: function () {
    return {
      isChecking: true
    }
  },
  methods: {
      checkUserLogin: function () {
        API.checkLogin()
        .then((res) => {
          this.isChecking = false
          if (res.data.userInfo) {
            this.cacheData.username = res.data.userInfo.username
            this.$store.commit({
              type: MUTATION_TYPES.LOGIN,
            })
          }
        })
        .catch((err) => {
          this.isChecking = false
          console.log('==== $http err:', err)
        })
      }
    },
    mounted: function () {
      this.checkUserLogin()
    }
}
</script>
