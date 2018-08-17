<template>
  <list-page :isLoading="isLoading" :total="total" :page="page" :limit="limit" :targetName="targetName" :fetchData="fetchData" :resetModal="resetModal" :deleteItem="deleteItem">
    <b-table striped bordered hover :items="list" :fields="fields">
      <template slot="actions" slot-scope="row">
        <b-button size="sm" @click.stop="openEditModal(row.item, $event.target)" class="mr-2" variant="info">{{ 'btn.Edit' | t }}</b-button>
        <b-button size="sm" @click.stop="deleteConfirm(row.item, $event.target)" class="mr-2" variant="danger">{{ 'btn.Delete' | t }}</b-button>
      </template>
    </b-table>
    <template slot="editModal">
      <modal-edit :resetModal="resetModal" :reloadAfterSuccess="reloadAfterSuccess" :categories="categories" :target="target" />
    </template>
  </list-page>
</template>

<script>
import API from '@/utils/API.js'
import listPage from '@/components/mixin/listPage.js'
import ModalEdit from './ModalEdit.vue'

export default {
  mixins: [listPage],
  data () {
    return {
      categories: [
        { value: null, text: this.$t('Please_select_one_item') }
      ],
    }
  },
  computed: {
    fields: function(){
      return [{
          key: 'title',
          label: this.$t('content.Title'),
        },{
          key: 'addTime',
          label: this.$t('content.Pubdate'),
          formatter: value => {
            return value ? new Date(value).toLocaleString() : ''
          }
        },{
          key: 'author.username',
          label: this.$t('content.Author')
        },{
          key: 'category.name',
          label: this.$t('Category_name')
        },{
          key: 'views',
          label: this.$t('content.Views')
        },{
          key: 'actions',
          label: this.$t('Actions'),
        }]
    },
    targetName: function() {
      return this.target.title
    }
  },
  components: {
    ModalEdit,
  },
  methods: {
    getDataListAPI: API.getContentList,
    deleteItemAPI: API.deleteContentById,
    openEditModal (item, button) {
      this.target = item
      this.$root.$emit('bv::show::modal', 'modalEdit', button)
    },
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
