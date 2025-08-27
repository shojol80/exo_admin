<template>
    <x-form-group :title="titleGroup"
                  :db-field="dbField"
                  class="form-group--input-flex"
                  :labelColsSm:="labelColsSm"
                  :labelColsLg="labelColsLg">
        <x-switch
            :label-position="labelPosition"
            v-bind="$attrs"
            v-on="$listeners"
            :id="idComputed"
            :value="value"
            :state="inputState(errors,valid)">
            <template v-if="labelPosition!=='default'"></template>
            {{ title }}
        </x-switch>
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
    name: "XFormSwitch",
    mixins: [xFormControl],
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        labelPosition: {
            default: 'default'
        }
    },
    computed: {
        titleGroup() {
            return this.labelPosition === 'default' ? this.title : null;
        }
    }
}
</script>
