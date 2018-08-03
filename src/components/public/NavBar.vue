<template>
  <b-navbar toggleable="md" type="dark" variant="dark" class="mb-3">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand to="/">我的博客</b-navbar-brand>
    <b-nav-text >{{ 'title' | translate }}</b-nav-text>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav >
        <b-nav-item to="/user">用户管理</b-nav-item>
        <b-nav-item-dropdown text="分类管理" right>
          <b-dropdown-item to="/category">分类列表</b-dropdown-item>
          <b-dropdown-item to="/categoryAdd">添加分类</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="文章管理" right>
          <b-dropdown-item to="/content">文章列表</b-dropdown-item>
          <b-dropdown-item to="/contentAdd">添加文章</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto" v-if="username">
        <b-nav-item-dropdown :text="username" right>
          <b-dropdown-item v-for="item in locales" :key="item" @click="setLocale(item)" :disabled="item === locale">{{ item | translate }}</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item href="#" disabled>退出</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  computed: {
    username: function () {
      const hasLogined = this.$store.state.hasLogined
      return hasLogined ? this.cacheData.username : ''
    },
    locale: function () {
      return this.$i18n.locale()
    },
    locales: function () {
      return this.$i18n.locales()
    }
  },
  methods: {
    setLocale: function (locale) {
      this.$i18n.set(locale)
    }
  }
}
</script>
