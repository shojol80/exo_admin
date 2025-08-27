<template>
    <app-screen>
        <div class="search">
            <waiter ref="waiter">
                <react-data-table
                    name="searchControllerTable"
                    ref="table"
                    :forms="forms"
                    :row-click-edit="true"
                    :show-filters="false"
                    :show-search="true"
                    :search-query="searchQuery"
                    :allow-add-new="false"
                    :allow-hide-search="false"
                    :save-state="true">
                    <template #beforeActions="props">
                        <action-button title="Setup" :icon="$icons.setup" @action="setup"
                                       shortkey="['ctrl', 'o']">
                        </action-button>
                    </template>
                </react-data-table>
            </waiter>
        </div>
    </app-screen>
</template>

<script>
import {R_SEARCH_SETTINGS} from '@/router/routs'
import ReactDataTable from '@/components/ReactDataTable/ReactDataTable'
import paramsExedit from '@/views/search/mixins/paramsExedit'

export default {
    name: 'Search',
    mixins: [paramsExedit],
    components: {ReactDataTable},
    computed: {
        searchQuery() {
            return this.$route.query['searchQuery'];
        }
    },
    methods: {
        setup() {
            this.$router.push({name: R_SEARCH_SETTINGS, params: {exedit: this.exedit}})
        },
    }
}
</script>

<style lang="scss">

</style>
