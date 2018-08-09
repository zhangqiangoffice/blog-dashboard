<template>
  <div>
    <nav-bar />
    <progress-overlay v-if="isChecking" />
    <transition v-else>
      <router-view />
    </transition>
    <fixed-alert />
  </div>
</template>

<script>
import NavBar from './components/public/NavBar.vue'
import ProgressOverlay from './components/public/ProgressOverlay.vue'
import FixedAlert from './components/public/FixedAlert.vue'

export default {
  components: {
    NavBar,
    ProgressOverlay,
    FixedAlert,
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
