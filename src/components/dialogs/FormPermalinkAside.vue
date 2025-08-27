<template>
    <dialog-aside
        ref="modal"
        v-bind="$dialogsProps"
        @hide="onModalHide"
        @hidden="onModalHidden"
        :hide-action-toolbar="true">
        <x-form-permalinks
            :form_id="form_id">
            <template #actionBefore>
                <action-button
                    :icon="$icons.back"
                    @action.prevent="back()">
                </action-button>
            </template>
        </x-form-permalinks>
    </dialog-aside>
</template>

<script>
import XFormPermalinks from '@/components/FormPermalinks/XFormPermalinks'
import withDialogAside from "@modules/dialogs/mixins/withDialogAside";

export default {
    name: "FormPermalinkAside",
    mixins: [withDialogAside],
    components: {XFormPermalinks},
    props: {
        form_id: {
            required: true
        }
    },
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/vue-component";


</style>
