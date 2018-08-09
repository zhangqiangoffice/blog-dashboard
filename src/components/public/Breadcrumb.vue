<template>
  <b-breadcrumb :items="items"/>
</template>

<script>
export default {
  props: {
    pageName: String
  },
  computed: {
    items: function () {
      return [{
        text: this.$t('Home'),
        to: '/'
      }, {
        text: this.pageName,
        active: true
      }]
    }
  }
}
</script>
