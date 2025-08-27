<template>
    <app-screen class="">
        <waiter ref="waiter">
            <action-toolbar>
                <action-group>
                    <action-back></action-back>
                    <action-button title="Save" :icon="$icons.save" @action="save"
                                   shortkey="['ctrl', 's']">
                    </action-button>
                    <action-button title="Reload"
                                   :icon="$icons.reload"
                                   @action="load">
                    </action-button>
                </action-group>
            </action-toolbar>
            <settings></settings>
        </waiter>
    </app-screen>

</template>

<script>

import {R_CONTROLLER} from '@/router/routs'
import Settings from '@/components/Controller/components/settings/Settings'

export default {
    name: 'ControllerCommonSettings',
    components: {Settings},
    data() {
        return {
            backRoute: R_CONTROLLER,
        }
    },
    computed: {
        params() {
            return JSON.parse(this.$route.query.params);
        }
    },
    async mounted() {
        await this.load()
    },
    methods: {
        async load() {
            await this.$store.dispatch('controller/settings/loadCommonConfig', this.params)
        },
        async save() {
            if (this.$store.getters['controller/settings/isFormChanged']) {
                let event = await this.$dialogs.confirm({
                    okTitle: 'CONFIRM',
                    message: 'Do you really want to change the url templates? ' +
                        'All permalinks in the child ' +
                        'reacts will be recalculated! Please make sure your routing in ' +
                        'the site config setup properly.'
                })
                if (event.trigger !== 'ok') return
            }
            await this.$store.dispatch('controller/settings/saveCommonConfig', this.params)
        }

    }
}
</script>

<style scoped>

</style>
