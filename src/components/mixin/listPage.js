import API from '@/utils/API.js'
import ProgressOverlay from '@/components/public/ProgressOverlay.vue'
import ModalDelete from '@/components/public/ModalDelete.vue'
import { ALERT_VARIANT } from '@/utils/values'

export default {
    data: function () {
        return {
            isLoading: true,
            list: [],
            page: 1,
            limit: 10,
            total: 0,
            target: {},
        }
    },
    components: {
        ProgressOverlay,
        ModalDelete,
    },
    methods: {
        fetchData: function (page) {
            this.isLoading = true
            return this.getDataListAPI(page || this.page, this.limit)
            .then(res => {
                this.list = res.data.list
                this.total = res.data.total
                this.isLoading = false
            })
            .catch(err => {
                this.isLoading = false
                API.handleErr(err)
            })
        },
        deleteConfirm (item, button) {
            this.target = item
            this.$root.$emit('bv::show::modal', 'modalDelete', button)
        },
        deleteItem() {
            this.isLoading = true
            this.deleteItemAPI(this.target._id)
                .then(res => {
                    if (res.data.code === 0) {
                        this.page = 1
                        this.$store.dispatch({ type: 'showAlert', content: `${this.$t('notice.Successful_operation')}`, variant: ALERT_VARIANT.SUCCESS })
                        return this.fetchData()
                    } else {
                        this.$store.dispatch({ type: 'showAlert', content: res.data.message, variant: ALERT_VARIANT.DANGER })
                    }
                })
                .catch(err => {
                    API.handleErr(err, `${this.$t('notice.Failed_to_delete')} : ${this.targetName} ! ${err.toString()}`)
                })
                .then(() => {
                    this.isLoading = false
                })
        },
        resetModal () {
            this.target = {}
        }
    },
    mounted: function () {
            this.fetchData()
    }
}
