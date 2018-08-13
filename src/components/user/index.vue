<template>
  <PageContainer pageName="nav.Users">
    <user-list />
  </PageContainer>
</template>

<script>
import PageContainer from '@/components/public/PageContainer.vue'
import UserList from '@/components/user/UserList.vue'

export default {
  components: {
    PageContainer,
    UserList,
  }
}
</script>
