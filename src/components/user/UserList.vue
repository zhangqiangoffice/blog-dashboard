<template>
  <div>
    <div class="position-relative">
      <b-table striped bordered hover :items="users" :fields="fields">
        <template slot="actions" slot-scope="row">
          <b-button size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-2">删除</b-button>
        </template>
      </b-table>
      <progress-overlay v-show="isLoading"/>
    </div>
    <b-pagination :disabled="isLoading" align="right" size="md" :total-rows="total" v-model="page" :per-page="limit" @change="fetchUsers"></b-pagination>
    <b-modal id="modalInfo" @hide="resetModal" :title="modalInfo.title" ok-only>
      <pre>{{ modalInfo.content }}</pre>
    </b-modal>
  </div>
</template>

<script>
import API from '@/utils/API.js'
import ProgressOverlay from '@/components/public/ProgressOverlay.vue'

export default {
  data: function () {
    return {
      isLoading: true,
      users: [],
      page: 1,
      limit: 10,
      total: 0,
      fields: [
        {
          key: 'username',
          label: '用户名'
        },
        {
          key: 'registerDate',
          label: '注册日期',
          formatter: value => {
            return value ? new Date(value).toLocaleString() : ''
          }
        },
        {
          key: 'isAdmin',
          label: '是否是管理员',
          formatter: value => {
            return value ? '是' : '否'
          }
        },
        {
          key: 'actions',
          label: '操作',
        }
      ],
      modalInfo: { title: '', content: '' },
    }
  },
  components: {
    ProgressOverlay,
  },
  methods: {
    fetchUsers: function (page) {
      this.isLoading = true
      API.userList(page || this.page, this.limit)
      .then(res => {
        this.users = res.data.list
        this.total = res.data.total
        this.isLoading = false
      })
      .catch(err => {
        this.isLoading = false
        console.log('err', err)
      })
    },
    info (item, index, button) {
      this.modalInfo.title = `Row index: ${index}`
      this.modalInfo.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
    },
    resetModal () {
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    },
  },
  mounted: function () {
    this.fetchUsers()
  }
}
</script>
