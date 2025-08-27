<template>
    <ValidationProvider
        :name="fq.label"
        :rules="ruleObject"
        v-slot="{ errors, valid }"
        tag="div"
        class="fe-control fe-input">
        <label
            class="fe-control__label"
            :for="id"
        >{{ fq.label }}
            <field-info-icon :fq="fq"></field-info-icon>
        </label>
        <b-form-input
            :id="id"
            class="fe-control__input"
            v-model="value"
            :type="type"
            :placeholder="fq.placeholder"
            :name="fq.fq_name"
            :state="inputState(errors,valid)"/>
        <invalid-feedback :id="id" :errors="inputErrors(errors)"></invalid-feedback>
    </ValidationProvider>
</template>

<script>

import inputs from './mixins/inputs'
import FieldInfoIcon from '@/components/ReactForm/components/FieldInfoIcon'

export default {
    name: "feInput",
    mixins: [inputs],
    components: {FieldInfoIcon},
    computed: {
        type() {
            let type = 'text'
            if (this.fq.fqt_name === 'numeric') type = 'number'
            if (this.fq.fqt_name === 'password') type = 'password'
            if (this.fq.fqt_name === 'useremail') type = 'email'
            return type
        },
    }
}
</script>

<style lang="scss">

</style>
