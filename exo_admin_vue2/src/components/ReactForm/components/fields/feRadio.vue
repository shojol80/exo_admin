<template>
    <ValidationProvider class="fe-control fe-radio"
                        :name="fq.label"
                        :rules="ruleObject" v-slot="{ errors, valid }"
                        tag="div">
        <fe-base-control :state="inputState(errors,valid)">
            <label :for="id" class="fe-control__label">
                {{ fq.label }}
                <field-info-icon :fq="fq"></field-info-icon>
            </label>
            <b-form-radio-group
                class="fe-radio__group"
                stacked
                :id="id"
                :name="fq.fq_name"
                v-model="value"
                :options="options"
                :state="inputState(errors,valid)">
            </b-form-radio-group>
        </fe-base-control>
        <invalid-feedback :id="id" :errors="inputErrors(errors)"></invalid-feedback>
    </ValidationProvider>

</template>

<script>

import inputs from './mixins/inputs'
import options from './mixins/options'
import feBaseControl from '../feBaseControl'
import FieldInfoIcon from '@/components/ReactForm/components/FieldInfoIcon'

export default {
    name: "feRadio",
    mixins: [inputs, options],
    components: {FieldInfoIcon, feBaseControl},
}
</script>

<style lang="scss">
@import "src/assets/scss/vue-component";

.fe-radio {
    &__group {
        margin-top: 0.375rem;
    }

    .custom-control.custom-radio:not(:last-child) {
        margin-bottom: 0.5rem;
    }
}

</style>
