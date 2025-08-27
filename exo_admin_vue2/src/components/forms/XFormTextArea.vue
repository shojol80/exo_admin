<template>
    <x-form-group :title="title"
                  :db-field="dbField"
                  :labelColsSm:="labelColsSm"
                  :labelColsLg="labelColsLg">
        <b-form-textarea
            v-bind="$attrs"
            v-on="$listeners"
            :id="idComputed"
            :value="value"
            :state="inputState(errors,valid)"
            :rows="rows">
        </b-form-textarea>
        <b-form-invalid-feedback id="inputLiveFeedback">
            {{ errors[0] }}
        </b-form-invalid-feedback>
        <slot v-for="(_, name) in $slots" :name="name" :slot="name"/>
        <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
            <slot :name="name" v-bind="slotData"/>
        </template>
    </x-form-group>
</template>

<script>

import xFormControl from '@/components/forms/mixins/xFormControl'

export default {
    name: "XFormTextArea",
    mixins: [xFormControl],
    model: {
        prop: 'value',
        event: 'input'
    },
    props: {
        rows: {
            default: '3'
        },
        placeholder: {
            type: String,
            default() {
                return ''
            }
        },
    }
}
</script>

<style lang="scss">

</style>
