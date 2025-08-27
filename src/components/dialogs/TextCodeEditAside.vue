<template>
    <dialog-aside
        class="text-code-edit-aside"
        ref="modal"
        v-bind="$dialogsProps"
        @hide="onModalHide"
        @hidden="onModalHidden"
        :hide-action-toolbar="true">
        <action-toolbar>
            <action-group>
                <action-button title="Cancel" :icon="$icons.back" @action="hide">
                </action-button>
                <action-button title="Save" :icon="$icons.save" @action="save"
                               shortkey="['ctrl', 's']">
                </action-button>
            </action-group>
        </action-toolbar>
        <x-code-editor v-model="localValue" ref="$cm" class="editor" :filename="filename"></x-code-editor>
    </dialog-aside>
</template>

<script>
import XCodeEditor from '@/components/XCodeEditor'
import withDialogAside from "@modules/dialogs/mixins/withDialogAside";

export default {
    name: "TextCodeEditAside",
    mixins: [withDialogAside],
    components: {XCodeEditor},
    props: {
        value: {
            required: true
        },
        onSave: {
            type: Function
        },
        filename: {
            type: String
        }
    },
    mounted() {
        this.$root.$on('bv::modal::shown', (bvEvent, modalId) => {
            if (this.$refs.$cm) {
                this.$refs.$cm.codemirror.refresh()
            }
        })
    },
    methods: {
        async save() {
            if (this.onSave) {
                await this.onSave(this.localValue)
            } else {
                this.ok()
            }
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/vue-component";

.text-code-edit-aside .x-code-editor {
    height: calc(100vh - #{$action-toolbar-height});
    padding-bottom: 1rem;
}

.mode-popup .text-code-edit-aside .x-code-editor {
    height: calc(100vh - #{$popup-header-height} - #{$action-toolbar-height});
}
</style>
