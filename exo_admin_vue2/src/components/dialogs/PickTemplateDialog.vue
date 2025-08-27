<template>
    <dialog-modal modal-class="pick-template-dialog"
                  size="xl"
                  hide-footer
                  v-bind="$dialogsProps"
                  @hide="onModalHide"
                  @hidden="onModalHidden"
                  ref="modal">
        <pick-template
            :tmpl_id="tmpl_id"
            :tg_id="tg_id"
            :filter="filter"
            @select="onSelect"
        ></pick-template>
    </dialog-modal>
</template>

<script>

import PickTemplate from '@/components/statefull/PickTemplate'
import withBModal from "@modules/dialogs/mixins/withBModal";

export default {
    name: "PickTemplateDialog",
    mixins: [withBModal],
    components: {PickTemplate},
    props: {
        tmpl_id: null,
        tg_id: null,
        filter: Object
    },
    methods: {
        onSelect(value) {
            this.localValue = value.tmpl_id
            this.ok()
        },
    }
}
</script>

<style lang="scss">
.pick-template-dialog {

    .modal-body {
        padding-top: 0;
    }

    .pick-template {
        .x-code-editor {
            height: 500px;
        }
    }
}
</style>
