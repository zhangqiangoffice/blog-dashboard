<template>
  <table class="table table-hover table-striped table-bordered">
    <thead>
        <tr>
            <th>ID</th>
            <th>用户名</th>
            <th>密码</th>
            <th>是否是管理员</th>
        </tr>
    </thead>

    <tbody>
        <tr>
            <td>user._id</td>
            <td>user.username</td>
            <td>user.password</td>
            <td>是</td>
        </tr>
    </tbody>
  </table>
</template>

<script>
// import axios from 'axios'

export default {
  data: function () {
    return {
      users: []
    }
  },
  methods: {
    fetchUsers: function () {
      // axios.get('http://localhost:3000/articles')
      //   .then(function(response){
      //     this.users = response.data
      //   })
      //   .catch(function(err) {
      //     console.log(err)
      //   })
    }
  },
  mounted: function () {
    this.fetchUsers()
  }
}
</script>
