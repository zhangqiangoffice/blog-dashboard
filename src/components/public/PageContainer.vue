<template>
  <div class="container-fluid">
    <Breadcrumb :pageName="pageName" />
    <h3>{{pageName}}</h3>
    <slot></slot>
  </div>
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
