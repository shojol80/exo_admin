<template>
    <app-screen>
        <waiter ref="waiter" :show="isLoading">
            <search-params v-model="params">
                <template slot="actionBefore">
                    <action-back :back-route="backRoute"></action-back>
                    <action-button title="Save" :icon="$icons.save" @action="save"
                                   shortkey="['ctrl', 's']">
                    </action-button>
                </template>
            </search-params>
        </waiter>
    </app-screen>
</template>

<script>

import {R_SEARCH_CONTROLLER} from "@/router/routs"
import reacts from '@/services/api/reacts'
import SearchParams from '@/components/search/SearchParams'
import paramsReact from '@/views/search/mixins/paramsReact'

export default {
    name: 'SearchControllerSettings',
    components: {SearchParams},
    mixins: [paramsReact],
    props: {
        react_id: {
            type: [String, Number],
            required: true
        }
    },
    data() {
        return {
            backRoute: R_SEARCH_CONTROLLER,
        }
    },
    methods: {
        save() {
            this.$refs.waiter.wait(
                reacts.saveReactFieldValue({
                    'react_id': this.react_id,
                    'name': 'params',
                    'value': this.paramsSerialize(this.params)
                })
            )
        },
    },
}
</script>

<style lang="scss">

</style>
