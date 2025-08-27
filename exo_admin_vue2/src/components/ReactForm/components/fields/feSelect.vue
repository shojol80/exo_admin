<template>
    <ValidationProvider class="fe-control fe-select"
                        :name="fq.label"
                        :rules="ruleObject" v-slot="{ errors, valid }"
                        tag="div">
        <label :for="id" class="fe-control__label">
            {{ fq.label }}
            <field-info-icon :fq="fq"></field-info-icon>
        </label>
        <x-select :id="id"
                  v-model="value"
                  :multiple="!!fq.ismultiple"
                  :name="fq.fq_name"
                  :placeholder="fq.placeholder"
                  :options="options"
                  label-key="text"
                  id-key="value"
                  :state="inputState(errors,valid)"/>
        <invalid-feedback :id="id" :errors="inputErrors(errors)"></invalid-feedback>
    </ValidationProvider>
</template>

<script>

import inputs from './mixins/inputs'
import select from './mixins/select'
import FieldInfoIcon from '@/components/ReactForm/components/FieldInfoIcon'

export default {
    name: "feSelect",
    components: {FieldInfoIcon},
    mixins: [inputs, select],
}
</script>

<style lang="scss">
@import "src/assets/scss/vue-component";

.fe-select {
    .vue-treeselect__control {
        padding-top: 25px;
    }
}
</style>
