<template>
  <div>
    <div class="position-relative">
      <b-table striped bordered hover :items="list" :fields="fields">
        <template slot="actions" slot-scope="row">
          <b-button size="sm" @click.stop="deleteConfirm(row.item, $event.target)" class="mr-2" variant="danger">{{ 'Delete' | t }}</b-button>
        </template>
      </b-table>
      <progress-overlay v-show="isLoading"/>
    </div>
    <b-pagination :disabled="isLoading" align="right" size="md" :total-rows="total" v-model="page" :per-page="limit" @change="fetchData"></b-pagination>
    <modal-delete :resetModal="resetModal" :deleteItem="deleteItem" :targetName="targetName"/>
  </div>
</template>

<script>
import API from '@/utils/API.js'
import listPage from '@/components/mixin/listPage.js'

export default {
  mixins: [listPage],
  computed: {
    fields: function(){
      return [{
          key: 'username',
          label: this.$t('User_name')
        },{
          key: 'registerDate',
          label: this.$t('Register_date'),
          formatter: value => {
            return value ? new Date(value).toLocaleString() : ''
          }
        },{
          key: 'isAdmin',
          label: this.$t('Administrator'),
          formatter: value => {
            return value ? this.$t('Yes') : this.$t('No')
          }
        },{
          key: 'actions',
          label: this.$t('Actions'),
        }]
    },
    targetName: function() {
      return this.target.username
    }
  },
  methods: {
    getDataListAPI: API.getUserList,
    deleteItemAPI: API.deleteUserById,
  },
}
</script>
