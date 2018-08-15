<template>
  <b-modal ref="modalEdit" id="modalEdit" :hide-header-close="isLoading" :hide-footer="isLoading" @hidden="afterHide" @ok="submit" :title="'btn.Edit' | t" :ok-title="'btn.Confirm' | t" :cancel-title="'btn.Cancel' | t">
    <b-form-group id="addCategory"
                  :label="`${$t('Category')} :`"
                  label-for="category">
      <b-form-select id="category"
                    :options="categories"
                    v-model="category"
                    required>
      </b-form-select>
    </b-form-group>
    <b-form-group id="addTitle"
                  :label="`${$t('content.Title')} :`"
                  label-for="title">
      <b-form-input id="title"
                    type="text"
                    v-model="title"
                    required
                    :placeholder=" 'Enter_title' | t ">
      </b-form-input>
    </b-form-group>
    <b-form-group id="addDescription"
                  :label="`${$t('content.Description')} :`"
                  label-for="description">
      <b-form-textarea id="description"
                    type="text"
                    v-model="description"
                    required
                    :rows="2"
                    :placeholder=" 'Enter_description' | t ">
      </b-form-textarea>
    </b-form-group>
    <b-form-group id="addContent"
                  :label="`${$t('content.Content')} :`"
                  label-for="content">
      <b-form-textarea id="content"
                    type="text"
                    v-model="content"
                    required
                    :rows="5"
                    :placeholder=" 'Enter_content' | t ">
      </b-form-textarea>
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
    categories: Array,
  },
  data () {
    return {
      isLoading: false,
      category: null,
      title: '',
      description: '',
      content: '',
    }
  },
  components: {
    ProgressOverlay,
  },
  watch: {
    target: function (newValue) {
      const { category, title, description, content } = newValue
      this.category = category && category._id
      this.title = title
      this.description = description
      this.content = content
    },
  },
  methods: {
    submit: function (evt) {
      evt.preventDefault()
      const { _id } = this.target;
      const { category, title, description, content } = this
      if (category && title && description && content) {
        this.isLoading = true
        API.updateContent(_id, category, title, description, content)
        .then(res => {
          if (!res.data.code) {
            this.$root.$emit('bv::hide::modal','modalEdit')
            this.reloadAfterSuccess()
          } else {
            this.invalidFeedback = res.data.message
            API.handleErr({}, res.data.message)
          }
        })
        .catch(API.handleErr)
        .then(() => {
          this.isLoading = false
        })
      }
    },
    afterHide () {
      this.isLoading = false
      this.resetModal()
    },
  }
}
</script>
