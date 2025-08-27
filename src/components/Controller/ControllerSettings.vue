<template>
    <div class="controller-settings">
        <waiter ref="waiter">
            <action-toolbar>
                <action-group>
                    <action-back @back="load" :back-route="backRoute"></action-back>
                    <action-button title="Save" :icon="$icons.save" @action="save"
                                   shortkey="['ctrl', 's']">
                    </action-button>
                    <action-button title="Reload"
                                   :icon="$icons.reload"
                                   @action="load">
                    </action-button>
                </action-group>
            </action-toolbar>
            <settings :allow-use-own-config="!isLegacyContainer"></settings>
        </waiter>
    </div>

</template>

<script>

import {R_CONTROLLER} from '@/router/routs'
import Settings from '@/components/Controller/components/settings/Settings'

export default {
    name: 'ControllerSettings',
    components: {Settings},
    data() {
        return {
            backRoute: R_CONTROLLER,
        }
    },
    computed: {
        isLegacyContainer() {
            return this.$store.getters['controller/settings/isLegacyContainer']
        }
    },
    methods: {
        load() {
            this.$store.dispatch('controller/settings/loadConfig')
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
            await this.$refs.waiter.wait(this.$store.dispatch('controller/settings/saveConfig'))
        }

    }
}
</script>

<style scoped>

</style>
