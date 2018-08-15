<template>
  <PageContainer pageName="nav.New_Category">
    <category-add />
  </PageContainer>
</template>

<script>
import PageContainer from '@/components/public/PageContainer.vue'
import CategoryAdd from './CategoryAdd.vue'

export default {
  components: {
    PageContainer,
    CategoryAdd,
  }
}
</script>
