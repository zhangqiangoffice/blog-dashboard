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

export default {
  components: {
    NavBar,
  },
  methods: {
      fetchUserInfo: function () {
        this.$http.post('http://localhost:8080/api/user/login', {
          username: 'admin',
          password: 'admin'
        })
          .then((res) => {
            if (res.status === 200) {
              this.$store.commit({
                type: MUTATION_TYPES.LOGIN,
                username: res.data.userInfo.username
              })
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