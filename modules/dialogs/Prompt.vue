<template>
    <dialog-modal
        ref="modal"
        v-bind="$dialogsProps"
        :variant="variant"
        @hide="onModalHide"
        @hidden="onModalHidden"
        :ok-disabled="okDisable"
        @shown="focusInput">
        <div>
            <label for="promptInput" v-html="message"></label>
            <b-form-input id="promptInput"
                          v-model="localValue"
                          autocomplete="off"
                          @keypress.native="onKeypress"
                          trim ref="input"
                          :required="required">
            </b-form-input>
        </div>
    </dialog-modal>
</template>

<script>
import withBModal from "./mixins/withBModal";

export default {
    name: 'Prompt',
    mixins: [withBModal],
    props: {
        variant: {default: 'primary'},
        message: {default: 'Enter value'},
        value: {default: ''},
        required: {default: false}
    },
    computed: {
        okDisable() {
            return this.required && !this.localValue
        }
    },
    methods: {
        onKeypress(e) {
            if (e.keyCode === 13) {
                this.$refs.modal.hide('ok')
            }
        },
        focusInput() {
            this.$refs.input.focus()
        },
    }
}
</script>
