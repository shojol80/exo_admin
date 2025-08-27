<template>
    <waiter ref="waiter">
        <b-card class="mt-3"
                no-header
                no-footer>
            <x-form-group
                :control-padding="true"
                db-field="useOwnConfig"
                title="This container has own settings"
                v-show="allowUseOwnConfig && haveCommonConfig">
                <b-form-checkbox
                    :value="1"
                    :unchecked-value="0"
                    @change="setScope"
                    v-model="useOwnConfig"
                    name="check-button"
                    size="lg" switch>
                </b-form-checkbox>
            </x-form-group>
            <x-form-fieldset title="Appearance & Behavior">
                <x-form-input
                    title="Name"
                    v-model="name"
                    db-field="name">
                </x-form-input>
                <x-form-select
                    title="Positions"
                    v-model="position"
                    :clearable="false"
                    :options="positions"
                    id-key="value"
                    label-key="value"/>
                <x-form-input
                    :disabled="isLegacyContainer"
                    title="Max depth"
                    v-model="maxDepth"
                    db-field="maxDepth">
                </x-form-input>
                <x-form-switch
                    :control-padding="true"
                    db-field="outputOnlyPublished"
                    title="Output only published reacts"
                    :value="1"
                    :unchecked-value="0"
                    v-model="outputOnlyPublished">
                </x-form-switch>
                <x-form-text-area
                    :disabled="isLegacyContainer"
                    title="Extra params"
                    v-model="extraParams"
                    db-field="extraParams">
                </x-form-text-area>
            </x-form-fieldset>
            <x-form-fieldset title="Forms in this group">
                <forms-table></forms-table>
            </x-form-fieldset>
        </b-card>
    </waiter>
</template>

<script>

import FormsTable from '@/components/Controller/components/settings/FormsTable'
import {R_CONTROLLER} from '@/router/routs'

export default {
    name: 'Settings',
    components: {FormsTable},
    props: {
        allowUseOwnConfig: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            backRoute: R_CONTROLLER,
            positions: [
                {value: 'Auto'},
                {value: 'Top left'},
                {value: 'Top Right'},
                {value: 'Bottom left'},
                {value: 'Bottom Right'},
            ],
        }
    },
    computed: {
        isLegacyContainer() {
            return this.$store.getters['controller/settings/isLegacyContainer']
        },
        haveCommonConfig() {
            return this.$store.getters['controller/getHolderType'] === 'react'
        },
        extraParams: {
            get() {
                return this.$store.getters['controller/settings/config'].extraParams
            },
            set(value) {
                this.$store.commit('controller/settings/setExtraParams', value)
            }
        },
        maxDepth: {
            get() {
                return this.$store.getters['controller/settings/config'].maxDepth
            },
            set(value) {
                this.$store.commit('controller/settings/setMaxDepth', value)
            }
        },
        useOwnConfig: {
            get() {
                return this.$store.getters['controller/settings/config'].useOwnConfig
            },
            set(value) {
                this.$store.commit('controller/settings/setUseOwnConfig', value)

            }
        },
        outputOnlyPublished: {
            get() {
                return this.$store.getters['controller/settings/config'].outputOnlyPublished
            },
            set(value) {
                this.$store.commit('controller/settings/setOutputOnlyPublished', value)

            }
        },
        name: {
            get() {
                return this.$store.getters['controller/settings/config'].name
            },
            set(value) {
                this.$store.commit('controller/settings/setName', value)
            }
        },
        position: {
            get() {
                return this.$store.getters['controller/settings/config'].buttonPosition
            },
            set(value) {
                this.$store.commit('controller/settings/setButtonPosition', value)
            }
        },
    },
    methods: {
        setScope(value) {
            this.$refs.waiter.wait(
                this.$store.dispatch('controller/settings/getContainerConfigByScope', {useOwnConfig: value})
            )
        }
    }
}
</script>

<style scoped>

</style>
