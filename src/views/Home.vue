<template>
  <div class="container-fluid">
    <div class="jumbotron">
      <h1>Hello, {{ username }}!</h1>
      <p>欢迎进入我的博客后台管理系统</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'home',
  computed: mapState(['username']),
  methods: {
      fetchUserInfo: function () {
        this.axios.get('http://localhost:8080/')
          .then((res) => {
            console.log('==============res', res)
          })
          .catch((err) => {
            console.log('==== axios err:', err)
          })
      }
    },
    mounted: function () {
      this.fetchUserInfo()
    }

}
</script>
