<template>
  <b-container fluid>
    <b-jumbotron :header="message" lead="欢迎进入我的博客后台管理系统"></b-jumbotron>
  </b-container>
</template>

<script>

export default {
  name: 'home',
  computed: {
    message: function () {
      const hasLogined = this.$store.state.hasLogined;
      return hasLogined ? `Hello, ${this.cacheData.username} !` : 'Loading ...'
    }
  }
}
</script>
