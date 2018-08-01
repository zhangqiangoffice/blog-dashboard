<template>
  <div class="container-fluid">
    <div class="jumbotron">
      <h1>{{ message }}</h1>
      <p>欢迎进入我的博客后台管理系统</p>
    </div>
  </div>
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
