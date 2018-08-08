<template>
  <div>
    <nav-bar />
    <progress-overlay v-if="isChecking" />
    <transition v-else>
      <router-view />
    </transition>
  </div>
</template>

<script>
import NavBar from './components/public/NavBar.vue'
import ProgressOverlay from './components/public/ProgressOverlay.vue'

export default {
  components: {
    NavBar,
    ProgressOverlay,
  },
  data: function () {
    return {
      isChecking: true
    }
  },
  mounted: function () {
    this.$store.dispatch({ type: 'checkLogin' })
    .then(() => {
      this.isChecking = false
    })
  }
}
</script>
