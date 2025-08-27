<template>
    <action-button
        :disabled="!react_id"
        title="Send mail"
        :icon="$icons.send_bulk"
        @action="send">
    </action-button>
</template>

<script>

import SendMailableAside from "@/components/dialogs/SendMailableAside";

export default {
    name: 'ActionSendMailable',
    components: {},
    props: {
        react_id: {},
    },
    computed: {},

    methods: {
        send() {
            //todo check for dirty
            this.$dialogs.show(SendMailableAside, {
                react_id: this.react_id
            })
        },
    }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/vue-component";

</style>
