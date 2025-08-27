<template>
    <dialog-modal
        ref="modal"
        v-bind="$dialogsProps"
        :variant="variant"
        @hide="onModalHide"
        @hidden="onModalHidden"
    >
        <div v-html="message"></div>
    </dialog-modal>
</template>

<script>

import withBModal from "./mixins/withBModal";
import DialogModal from "./DialogModal";

export default {
    name: "Confirm",
    components: {DialogModal},
    mixins: [withBModal],
    props: {
        variant: {default: 'warning'},
        message: {default: '<b>Are you sure?</b>'},
    },
}
</script>

