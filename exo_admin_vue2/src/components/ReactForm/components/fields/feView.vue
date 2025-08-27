<template>
    <ValidationProvider
        class="fe-control fe-view"
        :name="fq.label" :rules="ruleObject" v-slot="{ errors, valid }"
        tag="div">
        <label :for="id" class="fe-control__label">
            {{ fq.label }}
            <field-info-icon :fq="fq"></field-info-icon>
        </label>
        <action-edit-view class="fe-view__button" :view="value.view"></action-edit-view>
        <select-view
            :id="id"
            :name="fq.fq_name"
            :placeholder="fq.placeholder"
            v-model="value.view"
            :state="inputState(errors,valid)"
        />
        <invalid-feedback :id="id" :errors="inputErrors(errors)"></invalid-feedback>
    </ValidationProvider>
</template>

<script>

import FieldInfoIcon from '@/components/ReactForm/components/FieldInfoIcon'
import jsonValue from '@/components/ReactForm/components/fields/mixins/jsonValue'
import validation from '@/components/ReactForm/components/fields/mixins/validation'
import common from '@/components/ReactForm/components/fields/mixins/common'
import ActionEditView from '@/components/ReactForm/components/ActionEditView'

export default {
    name: "feView",
    components: {ActionEditView, FieldInfoIcon},
    mixins: [jsonValue, validation, common],
    methods: {
        empty() {
            return {
                view: undefined
            }
        }
    }
}
</script>

<style lang="scss">
@import "src/assets/scss/vue-component";

.fe-view {
    position: relative;

    &__button {
        position: absolute;
        top: 24px;
        right: 8px;
        z-index: 1;
    }

    .vue-treeselect__control {
        padding-top: 25px;
        padding-right: 48px;
    }
}

</style>
