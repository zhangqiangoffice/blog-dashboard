<template>
  <b-modal ref="modalEdit" id="modalEdit" :hide-header-close="isLoading" :hide-footer="isLoading" @hidden="afterHide" @ok="submit" :title="'btn.Edit' | t" :ok-title="'btn.Confirm' | t" :cancel-title="'btn.Cancel' | t">
    <b-form-group id="editCategory"
                  :label="`${$t('Category_name')} :`"
                  :description="description"
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
      description: '',
    }
  },
  components: {
    ProgressOverlay,
  },
  watch: {
    target: function (newValue) {
      this.categoryName = newValue.name
    }
  },
  methods: {
    submit: function (evt) {
      this.description = ''
      const { _id, name } = this.target;
      if (this.categoryName !== name) {
        evt.preventDefault()
        if (!this.categoryName) {
          this.description = `${this.$t('Category_name_can_not_be_empty')} !`
        } else {
          this.isLoading = true
          API.updateCategory(_id, this.categoryName)
          .then(res => {
            this.isLoading = false
            if (!res.data.code) {
              this.$root.$emit('bv::hide::modal','modalEdit')
              this.reloadAfterSuccess()
            }
          })
          .catch(err => {
            this.isLoading = false
            API.handleErr(err)
          })
        }
      }
    },
    afterHide: function () {
      this.isLoading = false
      this.description = ''
      this.resetModal()
    }
  }
}
</script>
