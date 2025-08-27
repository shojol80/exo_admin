<template>
    <app-screen>
        <div class="search-controller">
            <waiter ref="waiter" :show="isLoading">
                <react-data-table
                    name="searchControllerTable"
                    ref="table"
                    :forms="forms"
                    :row-click-edit="true"
                    :show-filters="false"
                    :show-search="true"
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
import {R_SEARCH_CONTROLLER_SETTINGS} from '@/router/routs'
import ReactDataTable from '@/components/ReactDataTable/ReactDataTable'
import paramsReact from '@/views/search/mixins/paramsReact'

export default {
    name: 'SearchController',
    mixins: [paramsReact],
    components: {ReactDataTable},
    props: {
        'react_id': {
            type: [String, Number],
            required: true
        }
    },
    data() {
        return {}
    },

    methods: {
        setup() {
            this.$router.push({name: R_SEARCH_CONTROLLER_SETTINGS, params: {react_id: this.react_id}})
        },
    }
}
</script>

<style lang="scss">

</style>
