<template>
    <app-screen>
        <div class="reacts-table">
            <waiter ref="waiter">
                <react-data-table
                    ref="table"
                    name="ReactsTableView"
                    :save-state="true"
                    :forms="forms"
                    :row-click-edit="true"
                    :filter="filter"
                    :show-filters="false"
                    :show-search="forms!==true"
                    :allow-add-new="true"
                >
                    <template #beforeActions>
                        <action-back v-if="$route.params.backRoute"></action-back>
                    </template>
                </react-data-table>
            </waiter>
        </div>
    </app-screen>
</template>

<script>
import ReactDataTable from '@/components/ReactDataTable/ReactDataTable'
import isEmpty from '@modules/isEmpty'

export default {
    name: 'ReactsTable',
    components: {ReactDataTable},
    data() {
        return {}
    },
    computed: {
        filter() {
            const filter = ['react_id', 'react_title', 'react_form_name', 'react_user_email', 'react_user_id']
                .reduce((filter, field) => {
                    if (this.$route.query[field]) {
                        filter[field] = this.$route.query[field]
                    }
                    return filter
                }, {})

            // DEBUG: Log filter construction
            console.log('🔍 ReactsTable filter computed:', {
                route_query: this.$route.query,
                constructed_filter: filter,
                has_react_user_id: !!this.$route.query.react_user_id,
                has_react_user_email: !!this.$route.query.react_user_email
            });

            return filter;
        },
        forms() {
            if (this.$route.query.forms && Array.isArray(this.$route.query.forms)) {
                return this.$route.query.forms.map(item => {
                    return {
                        form_id: item
                    }
                })
            } else if (!isEmpty(this.$route.query.forms)) {
                return [{
                    form_id: this.$route.query.forms
                }]
            }
            return true
        }
    },
    watch: {
        // Watch for route query changes and refresh table
        '$route.query': {
            handler(newQuery, oldQuery) {
                console.log('🔍 ReactsTable route query changed:', {
                    old: oldQuery,
                    new: newQuery
                });

                // Refresh table when route query changes
                if (this.$refs.table && this.$refs.table.$refs.table) {
                    this.$nextTick(() => {
                        this.$refs.table.$refs.table.refresh();
                    });
                }
            },
            deep: true,
            immediate: false
        }
    },
    activated() {
        // DEBUG: Log route query on activation
        console.log('🔍 ReactsTable activated with route query:', this.$route.query);

        // Force refresh when component is activated with new route params
        if (this.$refs.table && this.$refs.table.$refs.table) {
            this.$refs.table.$refs.table.refresh();
        }
    },
    methods: {},
}
</script>

<style lang="scss">
</style>
