<template>
    <ValidationProvider
        class="fe-control fe-textarea"
        :name="fq.label" :rules="ruleObject" v-slot="{ errors, valid }"
        tag="div">
        <label class="fe-control__label"
               :for="id">
            {{ fq.label }}
            <field-info-icon :fq="fq"></field-info-icon>
        </label>
        <div class="form-control fe-control__input"
             :class="{'is-invalid':inputState(errors)===false}">
            <textarea :id="id"
                      v-model="value"
                      rows="6"
                      :placeholder="fq.placeholder"
                      :name="fq.fq_name"
            />
        </div>
        <invalid-feedback :id="id" :errors="inputErrors(errors)"></invalid-feedback>
    </ValidationProvider>
</template>

<script>

import inputs from './mixins/inputs'
import FieldInfoIcon from '@/components/ReactForm/components/FieldInfoIcon'

export default {
    name: "feTextarea",
    components: {FieldInfoIcon},
    mixins: [inputs],
}
</script>

<style lang="scss">

@import "src/assets/scss/vue-component";

.fe-textarea {
    label {
        background: $input-bg;
    }

    textarea {
        width: 100%;
        border: none;
        color: $input-color;
    }
}

</style>
