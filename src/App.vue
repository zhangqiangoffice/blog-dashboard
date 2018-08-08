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
            this.$store.dispatch({
              type: 'login',
              username: res.data.userInfo.username
            })
          }
        })
        .catch((err) => {
          this.isChecking = false
          API.handleErr(err)
        })
      }
    },
    mounted: function () {
      this.checkUserLogin()
    }
}
</script>
