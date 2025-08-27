<template>
    <x-form-group :title="title"
                  :db-field="dbField"
                  :labelColsSm:="labelColsSm"
                  :labelColsLg="labelColsLg">
        <b-input-group>
            <b-form-input :type="isGenerated?'text':'password'"
                          v-bind="$attrs"
                          v-on="$listeners"
                          :id="idComputed"
                          :value="value"
                          @keyup.native="isGenerated=false"
                          :state="inputState(errors,valid)"
            />
            <b-form-invalid-feedback class="order-last" v-if="valid===false">
                {{ errors[0] }}
            </b-form-invalid-feedback>
            <b-input-group-append>
                <b-btn variant="outline-secondary" @click.prevent="generatePass">Generate</b-btn>
            </b-input-group-append>
        </b-input-group>
        <slot v-for="(_, name) in $slots" :name="name" :slot="name"/>
        <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
            <slot :name="name" v-bind="slotData"/>
        </template>
    </x-form-group>
</template>

<script>

import xFormControl from '@/components/forms/mixins/xFormControl'

export default {
    name: "XFormPassword",
    mixins: [xFormControl],
    data() {
        return {
            isGenerated: false,
        }
    },
    methods: {
        generatePass() {
            const range = 'abcdefghjkmnpqrstuvwxyz23456789!#$%^&@'
            const length = 8
            let newpass = ''
            for (let i = 0; i < length; i++) {
                newpass += range.charAt(Math.floor(Math.random() * range.length));
            }
            this.isGenerated = true
            this.$emit('input', newpass);
        },
    }
}
</script>
