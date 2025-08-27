<template>
    <dialog-modal modal-class="text-code-edit-dialog"
                  size="xl"
                  hide-footer
                  :hideHeaderClose="false"
                  v-bind="$dialogsProps"
                  @hide="onModalHide"
                  @hidden="onModalHidden"
                  ref="modal">
        <action-toolbar>
            <action-group>
                <action-button title="Cancel" :icon="$icons.back" @action="cancel()">
                </action-button>
                <action-button title="Confirm" :icon="$icons.confirm" @action="ok()"
                               shortkey="['ctrl', 's']">
                </action-button>
            </action-group>
        </action-toolbar>
        <x-code-editor v-model="localValue" ref="$cm" class="editor"></x-code-editor>
    </dialog-modal>
</template>

<script>

import XCodeEditor from '@/components/XCodeEditor'
import withBModal from "@modules/dialogs/mixins/withBModal";

export default {
    name: "TextCodeEditDialog",
    mixins: [withBModal],
    components: {XCodeEditor},
    props: {
        text: ''
    },
    data() {
        return {
            selected: 'code',
            options: [
                {text: 'Source', value: 'code'},
                {text: 'Editor', value: 'rich'}
            ]
        }
    },
    mounted() {
        this.localValue = this.text
        this.$root.$on('bv::modal::shown', (bvEvent, modalId) => {
            if (this.$refs.$cm) {
                this.$refs.$cm.codemirror.refresh()
            }
        })
    },
}
</script>

<style lang="scss">
.text-code-edit-dialog {
    .modal-body {
        padding-top: 0
    }

    .editor {
        height: 500px;
    }
}
</style>
