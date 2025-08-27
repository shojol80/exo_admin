<template>
    <action-button
        :icon="$icons.new"
        title="Add new block"
        @action="addNew">
    </action-button>
</template>
<script>
import EditReactAside from "@/components/dialogs/EditReactAside";

export default {
    name: 'NewBlockAction',
    computed: {
        form_id() {
            let form = this.$store.getters['forms/getFormByName']('pageblock')
            return form ? form['form_id'] : null
        },
    },
    methods: {
        async addNew() {
            let response = await this.$dialogs.show(EditReactAside, {
                form_id: this.form_id
            })
            if (response.value) {
                await this.$store.dispatch('rl/loadBlocks')
            }
        }
    }
}
</script>
