<template>
  <b-navbar toggleable="md" type="dark" variant="dark" class="mb-3">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand to="/">{{ 'My_Blog' | t }}</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav v-if="hasLogined">
        <b-nav-item to="/user">{{ 'nav.Users' | t }}</b-nav-item>
        <b-nav-item-dropdown :text="'nav.Categories' | t" right>
          <b-dropdown-item to="/category">{{ 'nav.Category_List' | t }}</b-dropdown-item>
          <b-dropdown-item to="/categoryAdd">{{ 'nav.New_Category' | t }}</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown :text="'nav.Contents' | t" right>
          <b-dropdown-item to="/content">{{ 'nav.Content_List' | t }}</b-dropdown-item>
          <b-dropdown-item to="/contentAdd">{{ 'nav.New_Content' | t }}</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <b-nav-text v-else>{{ 'Blogs_backstage_management_system' | t }}</b-nav-text>

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown :text="dropdownName" right>
          <b-dropdown-item v-for="lang in locales" :key="lang" @click="setLocale(lang)" :disabled="lang === locale">{{ lang | tIn(lang) }}</b-dropdown-item>
          <b-dropdown-divider v-if="hasLogined"></b-dropdown-divider>
          <b-dropdown-item href="#" v-if="hasLogined" @click="logout" >{{ 'Logout' | t }}</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>

export default {
  computed: {
    hasLogined: function () {
      return this.$store.state.hasLogined
    },
    dropdownName: function () {
      const hasLogined = this.$store.state.hasLogined
      return hasLogined ? this.cacheData.username : this.$t('Translations')
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
    },
    logout: function () {
      this.$store.dispatch({ type: 'logout' })
    }
  }
}
</script>
