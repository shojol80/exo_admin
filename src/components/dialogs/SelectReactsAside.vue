<template>
    <dialog-aside
        ref="modal"
        v-bind="$dialogsProps"
        @hide="onModalHide"
        @hidden="onModalHidden"
        :hide-action-toolbar="true">
        <select-react-table
            :confirm-title="confirmTitle"
            :allow-add-new="allowAddNew"
            :back-route="cancel"
            :forms="forms"
            :data-api="dataApi"
            @confirm="onConfirmSelect">
        </select-react-table>
    </dialog-aside>
</template>

<script>
import SelectReactTable from '@/components/SelectReactTable/SelectReactTable'
import withDialogAside from "@modules/dialogs/mixins/withDialogAside";

export default {
    name: 'SelectReactsAside',
    mixins: [withDialogAside],
    components: {SelectReactTable},
    props: {
        forms: {
            required: true
        },
        allowAddNew: {
            default: false
        },
        confirmTitle: {},
        dataApi: {
            type: Function
        },

    },
    methods: {
        onConfirmSelect(rows) {
            this.localValue = rows
            this.ok()
        },
    }
}
</script>

<style scoped>

</style>
