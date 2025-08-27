<template>
    <ValidationProvider class="fe-control fe-container"
                        tag='div' :name="fq.label"
                        :rules="ruleObject"
                        v-slot="{ errors, valid }">
        <fe-base-control :state="inputState(errors,valid)">
            <label :for="id"
                   class="fe-control__label">
                {{ fq.label }}
                <field-info-icon :fq="fq"></field-info-icon>
            </label>
            <action-group>
                <container-input
                    holder-type="react"
                    :holder-id="react_id"
                    :fq_name="fq.fq_name"
                    :value="value">
                </container-input>
            </action-group>
        </fe-base-control>
        <input type="hidden" v-model="value">
        <invalid-feedback :id="id" :errors="inputErrors(errors)"></invalid-feedback>
    </ValidationProvider>
</template>

<script>

import jsonValue from './mixins/jsonValue'
import feBaseControl from '../feBaseControl'
import FieldInfoIcon from '@/components/ReactForm/components/FieldInfoIcon'
import {R_CONTROLLER} from '@modules/routs'
import validation from '@/components/ReactForm/components/fields/mixins/validation'
import common from "@/components/ReactForm/components/fields/mixins/common";

export default {
    name: "feContainer",
    mixins: [jsonValue, validation, common],
    components: {FieldInfoIcon, feBaseControl},
    computed: {
        react_id() {
            return this.$store.getters['reactForm/react_id']
        },
    },
    methods: {
        empty() {
            return {
                items: [],
            }
        },
    }

}
</script>

<style lang="scss">
@import "@/assets/scss/vue-component";

.fe-container {

}
</style>
