<template>
    <x-form-group :title="title"
                  :db-field="dbField"
                  :description="description"
                  :labelColsSm:="labelColsSm"
                  :labelColsLg="labelColsLg">
        <x-input
            v-bind="$attrs"
            v-on="$listeners"
            :id="idComputed"
            :value="value"
            :state="inputState(errors,valid)"/>
        <b-form-invalid-feedback
            :state="inputState(errors,valid)"
            :id="'inputLiveFeedback_'+name">
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
    name: "XFormInput",
    mixins: [xFormControl],
}
</script>

<style lang="scss">

</style>
