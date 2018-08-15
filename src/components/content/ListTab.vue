<template>
  <PageContainer pageName="nav.Content_List">
    <content-list />
  </PageContainer>
</template>

<script>
import PageContainer from '@/components/public/PageContainer.vue'
import ContentList from './ContentList.vue'

export default {
  components: {
    PageContainer,
    ContentList,
  }
}
</script>
