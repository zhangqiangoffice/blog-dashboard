<template>
  <div>
    <NavBar :username="username" />
    <!-- <router-link to="/about">About</router-link> -->
    <transition name="slide-right">
      <router-view />
    </transition>
  </div>
</template>

<script>
import NavBar from './components/public/NavBar.vue'
import { mapState } from 'vuex'

export default {
  components: {
    NavBar,
  },
  computed: mapState(['username'])
}
</script>