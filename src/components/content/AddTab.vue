<template>
  <PageContainer pageName="nav.New_Content">
    <content-add />
  </PageContainer>
</template>

<script>
import PageContainer from '@/components/public/PageContainer.vue'
import ContentAdd from './ContentAdd.vue'

export default {
  components: {
    PageContainer,
    ContentAdd,
  }
}
</script>
