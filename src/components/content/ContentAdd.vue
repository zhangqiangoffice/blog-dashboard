<template>
  <b-form @submit="onSubmit" @reset="onReset">
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
    <b-button type="reset" variant="secondary" class="mr-2">{{ 'btn.Reset' | t }}</b-button>
    <b-button type="submit" variant="success">{{ 'btn.Submit' | t }}</b-button>
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
      category: null,
      title: '',
      description: '',
      content: '',
      categories: [
        { value: null, text: this.$t('Please_select_one_item') }
      ],
    }
  },
  components: {
    ProgressOverlay,
  },
  methods: {
    onSubmit: function (evt) {
      evt.preventDefault()
      const { category, title, description, content } = this
      if (category && title && description && content) {
        this.isLoading = true
        API.createContent(category, title, description, content)
        .then(res => {
          if (!res.data.code) {
            this.$store.dispatch({ type: 'showAlert', content: this.$t('notice.Successful_operation'), variant: ALERT_VARIANT.SUCCESS })
            this.clearData()
            this.$router.push('content')
          } else {
            API.handleErr({}, res.data.message)
          }
        })
        .catch(API.handleErr)
        .then(() => {
          this.isLoading = false
        })
      }
    },
    onReset (evt) {
      evt.preventDefault()
      this.clearData();
    },
    clearData () {
      this.category = null
      this.title = ''
      this.description = ''
      this.content = ''
    }
  },
  mounted: function () {
    API.getCategoryList()
    .then(res => {
      if (!res.data.code) {
        const { list } = res.data
        list.forEach(element => {
          this.categories.push({ value: element._id, text: element.name })
        });
      } else {
        API.handleErr({}, res.data.message)
      }
    })
    .catch(API.handleErr)
  }
}
</script>
