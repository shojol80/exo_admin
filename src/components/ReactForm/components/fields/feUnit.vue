<template>
    <ValidationProvider
        class="fe-control fe-unit"
        :name="fq.label" :rules="ruleObject" v-slot="{ errors, valid }"
        tag="div">
        <fe-base-control :state="inputState(errors,valid)">
            <label :for="id"
                   class="fe-control__label">
                {{ fq.label }}
                <field-info-icon :fq="fq"></field-info-icon>
            </label>
            <UnitInput
                v-model="value"
                :holder-id="fq.fq_name"
                :holder-parent-id="react_id"
                :holder-parent-type="'react'"/>
        </fe-base-control>
        <invalid-feedback :id="id" :errors="inputErrors(errors)"></invalid-feedback>
    </ValidationProvider>
</template>

<script>

import FieldInfoIcon from '@/components/ReactForm/components/FieldInfoIcon'
import jsonValue from '@/components/ReactForm/components/fields/mixins/jsonValue'
import validation from '@/components/ReactForm/components/fields/mixins/validation'
import common from '@/components/ReactForm/components/fields/mixins/common'
import feBaseControl from '@/components/ReactForm/components/feBaseControl'

export default {
    name: "feUnit",
    components: {FieldInfoIcon, feBaseControl},
    mixins: [jsonValue, validation, common],
    computed: {
        react_id() {
            return this.$store.getters['reactForm/react_id']
        }
    },
    methods: {
        empty() {
            return {
                component: undefined,
                payload: {},
            }
        }

    }

}
</script>

<style lang="scss">
@import "@/assets/scss/vue-component";

.fe-unit {
    position: relative;

}

</style>
