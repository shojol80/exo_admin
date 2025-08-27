<template>
    <dialog-aside
        ref="modal"
        v-bind="$dialogsProps"
        @hide="onModalHide"
        @hidden="onModalHidden"
        :hide-action-toolbar="true">
        <react-form
            ref="form"
            :react_id="react_id"
            :form_id="form_id"
            :react_edition_id="react_edition_id"
            @save="onSave">
            <template #actionBefore>
                <action-button
                    :icon="$icons.back"
                    @action.prevent="hide">
                </action-button>
            </template>
        </react-form>
    </dialog-aside>
</template>

<script>
import ReactForm from '@/components/ReactForm'
import withDialogAside from "@modules/dialogs/mixins/withDialogAside";

export default {
    name: "EditReactAside",
    components: {ReactForm},
    mixins: [withDialogAside],
    props: {
        react_id: {},
        form_id: {},
        react_edition_id: {}
    },
    computed: {},
    methods: {
        onSave(react_id) {
            this.localValue = react_id
        },
    },
}
</script>

<style scoped>

</style>
