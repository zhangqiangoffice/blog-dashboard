<template>
  <div>
    <NavBar />
    <!-- <router-link to="/about">About</router-link> -->
    <transition >
      <router-view />
    </transition>
  </div>
</template>

<script>
import NavBar from './components/public/NavBar.vue'
import { MUTATION_TYPES } from '@/utils/values'
import API from '@/utils/API.js'

export default {
  components: {
    NavBar,
  },
  methods: {
      fetchUserInfo: function () {
        API.login('admin', 'admin')
          .then((res) => {
            if (res.status === 200) {
              this.$store.commit({
                type: MUTATION_TYPES.LOGIN,
                username: res.data.userInfo.username
              })
            } else {
              console.log('===== res: ', res)
            }
          })
          .catch((err) => {
            console.log('==== $http err:', err)
          })
      }
    },
    mounted: function () {
      this.fetchUserInfo()
    }
}
</script>