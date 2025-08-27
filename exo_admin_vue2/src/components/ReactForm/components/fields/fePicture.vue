<template>
    <ValidationProvider class="fe-control fe-picture" tag="div" :name="fq.label" :rules="ruleObject"
                        v-slot="{ errors, valid }">
        <fe-base-control
            :state="inputState(errors,valid)">
            <label :for="id" class="fe-control__label">
                {{ fq.label }}
                <field-info-icon :fq="fq"></field-info-icon>
            </label>
            <picture-input v-model="value"/>
        </fe-base-control>
        <input type="hidden" v-model="value">
        <invalid-feedback :id="id" :errors="inputErrors(errors)"></invalid-feedback>

    </ValidationProvider>
</template>

<script>

import validation from './mixins/validation'
import common from './mixins/common'
import feBaseControl from '../feBaseControl'
import FieldInfoIcon from '@/components/ReactForm/components/FieldInfoIcon'
import jsonValue from '@/components/ReactForm/components/fields/mixins/jsonValue'
import pictureEmptyValue from '@/shared/pictureEmptyValue'

export default {
    name: "fePicture",
    mixins: [jsonValue, validation, common],
    components: {FieldInfoIcon, feBaseControl},
    model: {
        prop: 'fq',
        event: 'change'
    },
    data() {
        return {
            value: {},
        }
    },
    methods: {
        empty() {
            return pictureEmptyValue()
        },
    }
}
</script>

<style lang="scss">
@import "src/assets/scss/vue-component";


.fe-picure {

}

</style>
