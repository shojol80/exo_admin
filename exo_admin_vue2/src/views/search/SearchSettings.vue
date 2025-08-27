<template>
    <app-screen>
        <waiter ref="waiter">
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

import paramsExedit from "./mixins/paramsExedit"
import SearchParams from '@/components/search/SearchParams'
import vars from '@/services/api/vars'
import {R_SEARCH} from '@modules/routs'

export default {
    name: 'SearchSettings',
    components: {SearchParams},
    mixins: [paramsExedit],
    data() {
        return {
            backRoute: R_SEARCH,
        }
    },
    methods: {
        save() {
            this.holder.var_value = this.paramsSerialize(this.params)
            let v = [this.holder]
            this.$refs.waiter.wait(
                vars.saveVars(v)
            )
        },
    },
}
</script>

<style lang="scss">

</style>
