<template>
    <action-button
        :icon="$icons.filter"
        title="Setup filter rules"
        @action="setup">
    </action-button>
</template>
<script>
import rl from "@/services/api/rl";
import SetupQBRulesAside from "@/components/dialogs/SetupQBRulesAside";

export default {
    name: 'SetupFilterAction',
    computed: {
        forms() {
            let form = this.$store.getters['forms/getFormByName']('pageblock')
            return [form.form_id]
        }
    },
    methods: {
        async setup() {
            const filter = await rl.loadFilter()
            let response = await this.$dialogs.show(SetupQBRulesAside, {
                value: filter.QBRules,
                forms: this.forms
            })
            if (response.trigger === 'ok') {
                await rl.saveFilter({'QBRules': response.value})
                await this.$store.dispatch('rl/loadBlocks')
            }
        }
    }
}
</script>
