<template>
  <PageContainer pageName="nav.Categories">
    <category-list />
  </PageContainer>
</template>

<script>
import PageContainer from '@/components/public/PageContainer.vue'
import CategoryList from './CategoryList.vue'

export default {
  components: {
    PageContainer,
    CategoryList,
  }
}
</script>
