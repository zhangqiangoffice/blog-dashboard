<template>
  <div>
    <div class="position-relative">
      <slot></slot>
      <progress-overlay v-show="isLoading"/>
    </div>
    <b-pagination :disabled="isLoading" align="right" size="md" :total-rows="total" :page="page" :per-page="limit" @change="fetchData"></b-pagination>
    <modal-delete :resetModal="resetModal" :deleteItem="deleteItem" :targetName="targetName"/>
    <slot name="editModal"></slot>
  </div>
</template>

<script>
import ProgressOverlay from '@/components/public/ProgressOverlay.vue'
import ModalDelete from '@/components/public/ModalDelete.vue'

export default {
  props: {
    isLoading: Boolean,
    total: Number,
    page: Number,
    limit: Number,
    targetName: String,
    fetchData: Function,
    resetModal: Function,
    deleteItem: Function,
  },
  components: {
    ProgressOverlay,
    ModalDelete,
  },
}
</script>
