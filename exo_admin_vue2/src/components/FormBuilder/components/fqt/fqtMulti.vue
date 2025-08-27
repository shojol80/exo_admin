<template>
    <fqt-base
        v-bind="$attrs"
        v-on="$listeners">
        <template #default="{fq}">
            <x-form-group
                title="Options"
                label-for="input-1">
                <b-card>
                    <fq-values :fq.sync="fq"></fq-values>
                </b-card>
            </x-form-group>
        </template>
    </fqt-base>
</template>

<script>
import fqtBase from "./fqtBase"
import fqValues from "./fqValues"

export default {
    name: "fqtMulti",
    components: {
        fqValues,
        fqtBase
    },
    model: {
        prop: 'fq',
        event: 'change'
    },
}
</script>

