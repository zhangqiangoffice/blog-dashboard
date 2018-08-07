<template>
  <div>
    <div class="position-relative">
      <b-table striped bordered hover :items="users" :fields="fields">
        <template slot="isAdmin" slot-scope="data">
          {{data.index ? '是' : '否'}}
        </template>
        <template slot="operation" slot-scope="row">
          <b-button size="sm" @click.stop="row.toggleDetails" class="mr-2">删除</b-button>
        </template>
      </b-table>
      <progress-overlay v-show="isLoading"/>
    </div>
    <b-pagination :disabled="isLoading" align="right" size="md" :total-rows="total" v-model="page" :per-page="limit" @change="fetchUsers"></b-pagination>
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
          key: 'isAdmin',
          label: '是否是管理员',
        },
        {
          key: 'operation',
          label: '操作',
        }
      ],
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
    }
  },
  mounted: function () {
    this.fetchUsers()
  }
}
</script>


