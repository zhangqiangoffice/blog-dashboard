<template>
  <list-page :isLoading="isLoading" :total="total" :page="page" :limit="limit" :targetName="targetName" :fetchData="fetchData" :resetModal="resetModal" :deleteItem="deleteItem">
    <b-table striped bordered hover :items="list" :fields="fields">
      <template slot="actions" slot-scope="row">
        <b-button size="sm" @click.stop="openEditModal(row.item, $event.target)" class="mr-2" variant="info">{{ 'btn.Edit' | t }}</b-button>
        <b-button size="sm" @click.stop="deleteConfirm(row.item, $event.target)" class="mr-2" variant="danger">{{ 'btn.Delete' | t }}</b-button>
      </template>
    </b-table>
    <template slot="editModal">
      <modal-edit :resetModal="resetModal" :reloadAfterSuccess="reloadAfterSuccess" :target="target" />
    </template>
  </list-page>
</template>

<script>
import API from '@/utils/API.js'
import listPage from '@/components/mixin/listPage.js'
import ModalEdit from './ModalEdit.vue'

export default {
  mixins: [listPage],
  computed: {
    fields: function(){
      return [{
          key: 'name',
          label: this.$t('Category_name')
        },{
          key: 'actions',
          label: this.$t('Actions'),
        }]
    },
    targetName: function() {
      return this.target.name
    }
  },
  components: {
    ModalEdit,
  },
  methods: {
    getDataListAPI: API.getCategoryList,
    deleteItemAPI: API.deleteCategoryById,
    openEditModal (item, button) {
      this.target = item
      this.$root.$emit('bv::show::modal', 'modalEdit', button)
    },
  },
}
</script>
