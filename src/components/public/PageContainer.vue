<template>
  <b-container>
    <Breadcrumb :pageName="pageName" />
    <h5>{{pageName}}</h5>
    <slot></slot>
  </b-container>
</template>

<script>
import Breadcrumb from './Breadcrumb.vue'

export default {
  props: {
    pageName: String
  },
  components: {
    Breadcrumb,
  }
}
</script>
