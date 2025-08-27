<template>
    <x-form-group :title="title" :db-field="dbField"
                  :control-padding="true"
                  :labelColsSm:="labelColsSm"
                  :labelColsLg="labelColsLg">
        <b-form-radio-group
            :id="idComputed"
            v-bind="$attrs"
            v-on="$listeners"
            :checked="value"
            :state="inputState(errors,valid)">
            <slot></slot>
        </b-form-radio-group>

        <b-form-invalid-feedback id="inputLiveFeedback">
            {{ errors[0] }}
        </b-form-invalid-feedback>
    </x-form-group>
</template>

<script>

import xFormControl from '@/components/forms/mixins/xFormControl'

export default {
    name: "XFormRadioGroup",
    mixins: [xFormControl],
}
</script>
