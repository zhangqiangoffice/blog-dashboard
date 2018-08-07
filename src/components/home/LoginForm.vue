<template>
  <b-jumbotron>
    <h4>登录</h4>
    <hr class="my-4" />
    <b-form @submit="onSubmit" inline>
      <b-form-input class="mb-2 mr-sm-2 mb-sm-0" v-model="username" required type="text" placeholder="用户名" />
      <b-form-input class="mb-2 mr-sm-2 mb-sm-0" v-model="password" required type="password" placeholder="密码" />
      <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">记住我</b-form-checkbox>
      <b-button type="submit" variant="primary" :disabled="isLoading">登录</b-button>
    </b-form>
    <hr class="my-4" />
    <b-alert :show="errText !== ''" variant="danger">{{ errText }}</b-alert>
    <b-progress :value="100" v-show="isLoading" variant="info" animated></b-progress>
  </b-jumbotron>
</template>

<script>
import { MUTATION_TYPES } from '@/utils/values'
import API from '@/utils/API.js'

export default {
  data: function () {
    return {
      isLoading: false,
      errText: '',
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      this.isLoading = true;
      this.errText = '';
      API.login(this.username, this.password)
      .then((res) => {
        this.isLoading = false
        if (res.status === 200) {
          if (!res.data.code) {
            this.cacheData.username = this.username
            this.$store.commit({
              type: MUTATION_TYPES.LOGIN,
            })
          } else {
            this.errText = res.data.message
          }
        } else {
          this.errText = res.status
        }
      })
      .catch((err) => {
        this.isLoading = false
        this.errText = err
      })
    }
  }
}
</script>
