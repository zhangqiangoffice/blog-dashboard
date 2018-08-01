<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
          aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link class="navbar-brand" to="/">我的博客</router-link>
      </div>

      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li class="">
          <router-link to="/user">用户管理</router-link>
          </li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">分类管理
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link to="/category">分类列表</router-link>
              </li>
              <li>
                <router-link to="/categoryAdd">添加分类</router-link>
              </li>
            </ul>
          </li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">内容管理
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link to="/content">内容列表</router-link>
              </li>
              <li>
                <router-link to="/contentAdd">添加内容</router-link>
              </li>
            </ul>
          </li>
        </ul>

        <ul class="nav navbar-nav navbar-right" v-if="username">
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{ username }}
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <a href="#">退出</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    username: function () {
      const hasLogined = this.$store.state.hasLogined;
      return hasLogined ? this.cacheData.username : ''
    }
  },
}
</script>