<template>
  <div>
    <div class="position-relative">
      <b-table striped bordered hover :items="users" :fields="fields">
        <template slot="actions" slot-scope="row">
          <b-button size="sm" @click.stop="deleteConfirm(row.item, $event.target)" class="mr-2" variant="danger">{{ 'Delete' | t }}</b-button>
        </template>
      </b-table>
      <progress-overlay v-show="isLoading"/>
    </div>
    <b-pagination :disabled="isLoading" align="right" size="md" :total-rows="total" v-model="page" :per-page="limit" @change="fetchUsers"></b-pagination>
    <b-modal id="modalInfo" @hide="resetModal" @ok="deleteUser" :title="'Attention' | t" :ok-title="'Confirm' | t" :cancel-title="'Cancel' | t">
      <p>{{ 'Confirm_delete_user' | t }} <strong variant="info">{{ selectedUser.username }}</strong> ?</p>
    </b-modal>
  </div>
</template>

<script>
import API from '@/utils/API.js'
import ProgressOverlay from '@/components/public/ProgressOverlay.vue'
import { ALERT_VARIANT } from '@/utils/values'

export default {
  data: function () {
    return {
      isLoading: true,
      users: [],
      page: 1,
      limit: 10,
      total: 0,
      selectedUser: {},
    }
  },
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
  },
  components: {
    ProgressOverlay,
  },
  methods: {
    fetchUsers: function (page) {
      this.isLoading = true
      return API.getUserList(page || this.page, this.limit)
      .then(res => {
        this.users = res.data.list
        this.total = res.data.total
        this.isLoading = false
      })
      .catch(err => {
        this.isLoading = false
        API.handleErr(err)
      })
    },
    deleteConfirm (item, button) {
      this.selectedUser = item
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
    },
    deleteUser() {
      const { _id, username } = this.selectedUser
      this.isLoading = true
      API.deleteUserById(_id)
      .then(res => {
        if (res.data.code === 0) {
          this.page = 1
          this.$store.dispatch({ type: 'showAlert', content: `${this.$t('Successful_operation')}`, variant: ALERT_VARIANT.SUCCESS })
          return this.fetchUsers()
        } else {
          this.$store.dispatch({ type: 'showAlert', content: res.data.message, variant: ALERT_VARIANT.DANGER })
        }
      })
      .catch(err => {
        API.handleErr(err, `${this.$t('Failed_to_delete_the_user')} : ${username} ! ${err.toString()}`)
      })
      .then(() => {
        this.isLoading = false
      })
    },
    resetModal () {
      this.selectedUser = {}
    }
  },
  mounted: function () {
    this.fetchUsers()
  }
}
</script>
