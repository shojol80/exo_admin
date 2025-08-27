<template>
    <dialog-modal
        v-bind="$dialogsProps"
        @hide="onModalHide"
        @hidden="onModalHidden"
        :ok-disabled="!localValue"
        ref="modal">
        <select-form v-model="localValue"
                     :multiple="false"
                     :value-format="valueFormat"
                     :required="true"
                     :clearable="false"
                     :forms="forms"
                     :exclude-forms="excludeForms"/>
    </dialog-modal>
</template>

<script>
import withBModal from "@modules/dialogs/mixins/withBModal";

export default {
    name: "SelectFormDialog",
    mixins: [withBModal],
    props: {
        title: {default: 'Forms'},
        forms: [Array, Boolean],
        excludeForms: Array,
        valueFormat: {default: 'object'},
        default: null,
    },
    mounted() {
        this.localValue = this.default ? this.default : null;
    },
}
</script>

