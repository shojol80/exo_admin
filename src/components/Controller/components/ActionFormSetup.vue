<template>
    <action-button
        v-if="isActionContainer"
        @action="action"
        title="Setup form"
        :icon="$icons.form">
    </action-button>
</template>

<script>
import {R_FORM_EDIT} from '@modules/routs'

export default {
    name: "ActionFormSetup",
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
            this.$router.push({name: R_FORM_EDIT, params: {form_id: this.form_id, group_id: 0}})
        },
    }
}
</script>

<style scoped>

</style>
