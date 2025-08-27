<template>
    <dialog-modal modal-class="pick-file-dialog"
                  size="xl"
                  hide-footer
                  :hideHeaderClose="false"
                  v-bind="$dialogsProps"
                  @hide="onModalHide"
                  @hidden="onModalHidden"
                  ref="modal">
        <file-manager
            :mode="mode"
            :settings="settings"
            @select="onSelect">
        </file-manager>
    </dialog-modal>
</template>

<script>

import FileManager from '@/components/FileManager/FileManager'
import withBModal from "@modules/dialogs/mixins/withBModal";

export default {
    name: "PickFileDialog",
    mixins: [withBModal],
    components: {FileManager},
    props: {
        settings: null,
        mode: {default: 'select'}
    },
    data() {
        return {}
    },
    watch: {},
    methods: {
        onSelect(selection) {
            this.localValue = selection
            this.ok()
        },
    }
}
</script>

<style lang="scss">
.pick-file-dialog {
    .modal-body {
        padding: 0;
    }

    .file-manager {
        height: 500px;

    }
}
</style>
