<template>
  <b-modal ref="modalEdit" id="modalEdit" :hide-header-close="isLoading" :hide-footer="isLoading" @hidden="afterHide" @ok="submit" :title="'btn.Edit' | t" :ok-title="'btn.Confirm' | t" :cancel-title="'btn.Cancel' | t">
    <b-form-group id="editCategory"
                  :state="invalidFeedback === ''"
                  :label="`${$t('Category_name')} :`"
                  :invalid-feedback="invalidFeedback"
                  label-for="category_name">
      <b-form-input id="category_name"
                    ref="name_input"
                    type="text"
                    v-model="categoryName"
                    required
                    :placeholder=" 'Enter_name' | t ">
      </b-form-input>
    </b-form-group>
    <progress-overlay v-show="isLoading"/>
  </b-modal>
</template>

<script>
import ProgressOverlay from '@/components/public/ProgressOverlay.vue'
import API from '@/utils/API.js'

export default {
  props: {
    resetModal: Function,
    reloadAfterSuccess: Function,
    target: Object,
  },
  data () {
    return {
      isLoading: false,
      categoryName: '',
      invalidFeedback: ''
    }
  },
  components: {
    ProgressOverlay,
  },
  watch: {
    target: function (newValue) {
      this.categoryName = newValue.name
    },
    categoryName: function (newValue) {
      if (newValue === '') {
        this.invalidFeedback = `${this.$t('Category_name_can_not_be_empty')} !`
      } else {
        this.invalidFeedback = ''
      }
    }
  },
  methods: {
    submit: function (evt) {
      const { _id, name } = this.target;
      if (this.categoryName !== name) {
        evt.preventDefault()
        if (this.categoryName) {
          this.isLoading = true
          API.updateCategory(_id, this.categoryName)
          .then(res => {
            this.isLoading = false
            if (!res.data.code) {
              this.$root.$emit('bv::hide::modal','modalEdit')
              this.reloadAfterSuccess()
            } else {
              this.invalidFeedback = res.data.message
            }
          })
          .catch(err => {
            this.isLoading = false
            API.handleErr(err)
          })
        }
      }
    },
    afterHide () {
      this.isLoading = false
      this.invalidFeedback = ''
      this.resetModal()
    },
  }
}
</script>
