<template>
    <dialog-modal
        v-bind="$dialogsProps"
        @hide="onModalHide"
        @hidden="onModalHidden"
        :ok-disabled="!localValue"
        ref="modal">
        <select-edition v-model="localValue"
                        :multiple="false"
                        :value-format="valueFormat"
                        :required="true"
                        :clearable="false"
        />
    </dialog-modal>
</template>

<script>
import withBModal from "@modules/dialogs/mixins/withBModal";

export default {
    name: 'SelectEditionDialog',
    mixins: [withBModal],
    props: {
        title: {default: 'Editions'},
        valueFormat: {default: 'object'},
        default: null,
    },
    mounted() {
        this.localValue = this.default ? this.default : null;
    },
}
</script>

