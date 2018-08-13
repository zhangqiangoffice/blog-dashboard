<template>
  <b-modal id="modalDelete" @hide="resetModal" @ok="deleteItem" :title="'Attention' | t" :ok-title="'Confirm' | t" :cancel-title="'Cancel' | t">
    <p>{{ 'Confirm_delete' | t }}: <strong variant="info">{{ targetName }}</strong> ?</p>
  </b-modal>
</template>

<script>

export default {
  props: {
    resetModal: Function,
    deleteItem: Function,
    targetName: String,
  },
}
</script>
