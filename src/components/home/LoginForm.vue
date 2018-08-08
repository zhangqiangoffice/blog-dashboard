<template>
  <b-jumbotron class="position-relative">
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
    <progress-overlay v-show="isLoading"/>
  </b-jumbotron>
</template>

<script>
import ProgressOverlay from '@/components/public/ProgressOverlay.vue'

export default {
  data: function () {
    return {
      isLoading: false,
      errText: '',
      username: '',
      password: ''
    }
  },
  components: {
    ProgressOverlay,
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      this.isLoading = true;
      this.errText = '';
      this.$store.dispatch({
        type: 'login',
        username: this.username,
        password: this.password,
      })
      .then(errText => {
        this.isLoading = false
        if (errText) {
          this.errText = errText
        }
      })
    }
  }
}
</script>
