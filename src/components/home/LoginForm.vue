<template>
  <b-jumbotron class="position-relative">
    <h4>{{ 'Login' | t }}</h4>
    <hr class="my-4" />
    <b-form @submit="onSubmit" inline>
      <b-form-input class="mb-2 mr-sm-2 mb-sm-0" v-model="username" required type="text" :placeholder="'User_name' | t" />
      <b-form-input class="mb-2 mr-sm-2 mb-sm-0" v-model="password" required type="password" :placeholder="'Password' | t" />
      <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">{{ 'Remember_me' | t }}</b-form-checkbox>
      <b-button type="submit" variant="primary" :disabled="isLoading">{{ 'Login' | t }}</b-button>
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
