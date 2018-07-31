<template>
  <ol class="breadcrumb">
    <li>
      <router-link to="/">管理首页</router-link>
    </li>
    <li class="active">{{pageName}}</li>
  </ol>
</template>

<script>
export default {
  props: {
    pageName: String
  },
}
</script>
