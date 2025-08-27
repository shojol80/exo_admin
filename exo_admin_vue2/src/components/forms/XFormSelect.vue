<template>
    <x-form-group :title="title"
                  :db-field="dbField"
                  :labelColsSm:="labelColsSm"
                  :labelColsLg="labelColsLg">
        <x-select
            :id="idComputed"
            v-bind="$attrs"
            v-on="$listeners"
            :value="value"
            :placeholder="placeholder"
            :state="inputState(errors,valid)">
            <slot v-for="(_, name) in $slots" :name="name" :slot="name"/>
            <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
                <slot :name="name" v-bind="slotData"/>
            </template>
        </x-select>
        <b-form-invalid-feedback id="inputLiveFeedback">
            {{ errors[0] }}
        </b-form-invalid-feedback>
    </x-form-group>
</template>

<script>

import xFormControl from '@/components/forms/mixins/xFormControl'

export default {
    name: "XFormSelect",
    mixins: [xFormControl],
    props: {
        placeholder: {
            type: String,
            default: ''
        }
    },
}
</script>
