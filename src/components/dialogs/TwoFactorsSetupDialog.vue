<template>
    <dialog-modal modal-class="two-factors-setup-dialog"
                  size="md"
                  hide-footer
                  title="Set up Authenticator"
                  v-bind="$dialogsProps"
                  @hide="onModalHide"
                  @hidden="onModalHidden"
                  ref="modal">
        <two-step-auth hide-header="true" :u_id="u_id" @done="onDone"></two-step-auth>
    </dialog-modal>
</template>

<script>

import withBModal from "@modules/dialogs/mixins/withBModal";
import TwoStepAuth from "@/components/statefull/TwoStepAuth.vue";

export default {
    name: "TwoFactorsSetupDialog",
    mixins: [withBModal],
    components: {TwoStepAuth},
    props: {
        u_id: null,
    },
    methods: {
        onDone() {
            this.ok()
        },
    }
}
</script>

<style lang="scss">

</style>
