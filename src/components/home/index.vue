<template>
  <b-container fluid>
    <welcome v-if="hasLogined" />
    <login-form v-else />
  </b-container>
</template>

<script>
import Welcome from './Welcome.vue'
import LoginForm from './LoginForm.vue'

export default {
  name: 'HomeTab',
  components: {
    Welcome,
    LoginForm,
  },
  computed: {
    hasLogined: function () {
      return this.$store.state.hasLogined;
    }
  }
}
</script>
