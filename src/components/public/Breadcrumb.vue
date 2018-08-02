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
        text: '控制台首页',
        to: '/'
      }, {
        text: this.pageName,
        active: true
      }]
    }
  }
}
</script>
