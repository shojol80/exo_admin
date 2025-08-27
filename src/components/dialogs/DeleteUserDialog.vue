<template>
    <dialog-modal
        :variant="variant"
        v-bind="$dialogsProps"
        @hide="onModalHideCustom"
        @hidden="onModalHidden"
        ref="modal">
        <div><p v-html="message"></p></div>

        <div class="mt-3">
            <b-form-radio-group v-model="reactAction" :options="reactOptions" stacked></b-form-radio-group>

            <div v-if="reactAction === 'transfer'" class="mt-3">
                <label class="form-label">Or transfer them to another account:</label>
                <select-user
                    v-model="transferToUserId"
                    :exclude-user-ids="excludeUserIds"
                    placeholder="user@example.com">
                </select-user>
            </div>
        </div>
    </dialog-modal>
</template>

<script>
import withBModal from "@modules/dialogs/mixins/withBModal";

export default {
    name: "DeleteUserDialog",
    mixins: [withBModal],
    props: {
        okTitle: {default: 'DELETE'},
        variant: {default: 'danger'},
        message: {default: 'Do you want to delete User?'},
        excludeUserIds: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            reactAction: 'delete',
            transferToUserId: null,
            reactOptions: [
                { text: 'Delete reacts created by this account', value: 'delete' },
                { text: 'Transfer them to another account', value: 'transfer' }
            ]
        }
    },
    computed: {
        cascade() {
            return this.reactAction === 'delete'
        }
    },
    methods: {
        onModalHideCustom(e) {
            e.cascade = this.cascade
            e.transferToUserId = this.reactAction === 'transfer' ? this.transferToUserId : null
            this.onModalHide(e)
        }
    }
}
</script>

<style scoped>

</style>
