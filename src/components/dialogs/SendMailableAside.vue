<template>
    <dialog-aside
        ref="modal"
        v-bind="$dialogsProps"
        @hide="onModalHide"
        @hidden="onModalHidden"
        :hide-action-toolbar="true">
        <send-mailable :react_id="react_id">
            <template #before_actions>
                <action-button
                    :icon="$icons.back"
                    @action.prevent="back">
                </action-button>
            </template>
        </send-mailable>
    </dialog-aside>
</template>

<script>
import SendMailable from '@/components/SendMailable/SendMailable'
import withDialogAside from "@modules/dialogs/mixins/withDialogAside";

export default {
    name: "SendMailableAside",
    mixins: [withDialogAside],
    components: {SendMailable},
    props: {
        react_id: {
            required: true
        }
    },
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/vue-component";


</style>
