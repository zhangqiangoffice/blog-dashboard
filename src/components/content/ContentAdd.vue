<template>
  <b-form @submit="onSubmit" @reset="onReset">
    <b-form-group id="addCategory"
                  :state="invalidFeedback === ''"
                  :label="`${$t('Category_name')} :`"
                  :invalid-feedback="invalidFeedback"
                  :valid-feedback="validFeedback"
                  label-for="category_name">
      <b-form-input id="category_name"
                    type="text"
                    @input="clearFeedback"
                    v-model="categoryName"
                    required
                    :placeholder=" 'Enter_name' | t ">
      </b-form-input>
    </b-form-group>
    <b-button type="reset" variant="secondary" class="mr-2">{{ 'btn.Reset' | t }}</b-button>
    <b-button type="submit" variant="primary">{{ 'btn.Submit' | t }}</b-button>
    <progress-overlay v-show="isLoading"/>
  </b-form>
</template>

<script>
import ProgressOverlay from '@/components/public/ProgressOverlay.vue'
import API from '@/utils/API.js'
import { ALERT_VARIANT } from '@/utils/values'

export default {
  data () {
    return {
      isLoading: false,
      categoryName: '',
      invalidFeedback: '',
      validFeedback: '',
    }
  },
  components: {
    ProgressOverlay,
  },
  methods: {
    clearFeedback: function () {
      this.invalidFeedback = '';
      this.validFeedback = '';
    },
    onSubmit: function (evt) {
      evt.preventDefault()
      this.clearFeedback()
      if (this.categoryName) {
        this.isLoading = true
        API.createCategory(this.categoryName)
        .then(res => {
          if (!res.data.code) {
            this.categoryName = '';
            this.validFeedback = this.$t('notice.Successful_operation');
            this.$store.dispatch({ type: 'showAlert', content: this.validFeedback, variant: ALERT_VARIANT.SUCCESS })
          } else {
            this.invalidFeedback = res.data.message;
            this.$store.dispatch({ type: 'showAlert', content: this.invalidFeedback, variant: ALERT_VARIANT.DANGER })
          }
        })
        .catch(err => {
          API.handleErr(err)
        })
        .then(() => {
          this.isLoading = false
        })
      }
    },
    onReset (evt) {
      evt.preventDefault();
      this.categoryName = '';
      this.clearFeedback()
    },
  }
}
</script>
