<template>
  <b-modal id="modalDelete" @hidden="resetModal" @ok="deleteItem" :title="'Attention' | t" :ok-title="'btn.Confirm' | t" :cancel-title="'btn.Cancel' | t">
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
