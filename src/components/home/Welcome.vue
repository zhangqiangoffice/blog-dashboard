<template>
    <b-jumbotron :header="message" :lead="'Welcome_to_dashboard' | t"></b-jumbotron>
</template>

<script>

export default {
  computed: {
    message: function () {
      return `${this.$t('Hello')}, ${this.cacheData.username} !`
    }
  }
}
</script>
