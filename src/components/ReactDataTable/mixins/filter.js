import availableForms from './availableForms'
import availableEditions from './availableEditions'

export default {
    mixins: [availableForms, availableEditions],
    data() {
        return {
            showSearch_val: this.showSearch,
            showFilters_val: this.showFilters,
            customFilters: [
                'react_id',
                'react_title',
                'react_form_name',
                'react_edition_id',
                'react_user_email',
                'react_user_id',
            ],
        }
    },
    computed: {
        emptyFilter() {
            return this.customFilters.reduce((filter, field) => {
                filter[field] = ''
                return filter
            }, {})
        },
        fullFilter() {
            return this.customFilters.reduce((filter, field) => {
                filter[field] = this.filter[field] ? this.filter[field] : ''
                return filter
            }, {})
        },

    },
    watch: {
        availableFormsFilter: {
            immediate: true,
            handler() {
                this.options.listColumns.react_form_name = this.availableFormsFilter
            }
        },
        availableEditionsFilter: {
            immediate: true,
            handler() {
                this.options.listColumns.react_edition_id = this.availableEditionsFilter || [];
            }
        },
        filter: {
            immediate: true,
            handler(newVal,oldVal) {
                //this.updateFilter()
            }
        },
        showFilters: {
            handler() {
                this.showFilters_val = this.showFilters
            }
        },
    },

    methods: {
        /*updateFilter() {
            if (Object.values(this.fullFilter).join('').length > 0) {
                //this.switchFilters(true)
            } else {
                //this.switchFilters(false)
            }
        },*/
        onSetFilter(filter) {
            //this.filter_val[filter['name']] = filter['value']
        },
        /*switchFilters(enable) {
            //if (this.showFilters_val === enable) return
            this.showFilters_val = enable
            if (this.showFilters_val) {
                this.options.filterable = this.customFilters

            } else {
                if (this.$refs.table) {
                    this.$refs.table.setFilter(this.emptyFilter)
                }
                this.options.filterable = false
            }
            this.$nextTick(() => {
                if (this.showFilters_val) {
                    this.$refs.table.setFilter(this.fullFilter)
                } else {
                    //this.$refs.table.setFilter({})
                    this.load()
                }
            })
        },*/
    }
}
