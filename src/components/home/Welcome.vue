<template>
    <b-jumbotron :header="message" lead="欢迎进入我的博客后台管理系统"></b-jumbotron>
</template>

<script>

export default {
  computed: {
    message: function () {
      return `Hello, ${this.cacheData.username} !`
    }
  }
}
</script>
