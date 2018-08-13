<template>
  <b-container>
    <Breadcrumb :pageName="name" />
    <h5>{{ name }}</h5>
    <slot></slot>
  </b-container>
</template>

<script>
import Breadcrumb from './Breadcrumb.vue'

export default {
  props: {
    pageName: String
  },
  computed: {
    name: function() {
      return this.$t(this.pageName)
    }
  },
  components: {
    Breadcrumb,
  }
}
</script>
