<template>
    <fqt-base
        v-bind="$attrs"
        v-on="$listeners">
        <template #required><span class="d-none"></span></template>
        <template #customParam="{fq}">
            <x-form-group>
                <action-button
                    :disabled="fq.fq_id<0"
                    @action="setup(fq)"
                    :icon="$icons.setup">Container settings
                </action-button>
            </x-form-group>
        </template>
    </fqt-base>
</template>

<script>
import fqtBase from "./fqtBase"
import fqValues from "./fqValues"
import {R_CONTROLLER_COMMON_SETTINGS} from '@modules/routs'

export default {
    name: "fqtContainer",
    components: {
        fqValues,
        fqtBase
    },
    model: {
        prop: 'fq',
        event: 'change'
    },
    methods: {
        async setup(fq) {
            await this.$router.push({
                name: R_CONTROLLER_COMMON_SETTINGS,
                params: {
                    params: {
                        form_id: fq.fq_form,
                        fq_name: fq.fq_name
                    }
                },
                query: {
                    params: JSON.stringify({
                        form_id: fq.fq_form,
                        fq_name: fq.fq_name
                    }),
                    back: this.$route.path
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
