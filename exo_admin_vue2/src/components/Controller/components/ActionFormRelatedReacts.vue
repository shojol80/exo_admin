<template>
    <action-button
        v-if="isActionContainer"
        @action="action"
        title="Related reactions"
        :icon="$icons.react">
    </action-button>
</template>

<script>
import {R_REACTS_TABLE} from '@modules/routs'

export default {
    name: "ActionFormRelatedReacts",
    computed: {
        form_id() {
            return this.$store.getters['controller/getActionFormId']
        },
        isActionContainer() {
            return this.$store.getters['controller/isActionContainer']
        }
    },
    methods: {
        action() {
            this.$router.push({
                name: R_REACTS_TABLE,
                params: {backRoute: true},
                query: {forms: [this.form_id]}
            })
        },
    }
}
</script>

<style scoped>

</style>
