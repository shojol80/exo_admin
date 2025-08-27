<template>
    <action-dropdown split :icon="$icons.external_link"
                     @action="openSite(current_edition_id)">
        {{ current_edition.e_title }}
        <template #dropdown>
            <b-dropdown-item v-for="e in editions" @click="openSite(e.e_id)" :key="e.e_id" >
                {{ e.e_title }}
            </b-dropdown-item>
        </template>
    </action-dropdown>

</template>

<script>

export default {
    name: 'EditionOpener',
    components: {},
    data: () => {
        return {}
    },
    computed: {
        current_edition() {
            return this.$store.state.pages.editions.find(e => +e.e_id === +this.current_edition_id)
        },
        current_domain() {
            let domain = this.$store.state.pages.domains.find(d => +d.domain_edition_id === +this.current_edition_id)
            return domain ? '//' + domain['domain_name'] : ''
        },
        current_edition_id() {
            return this.$store.state.exolog.defaults.edition
        },
        editions() {
            return this.$store.state.pages.editions.filter(e => +e.e_id !== +this.current_edition_id).map(e => {
                return {e_id: e.e_id, e_title: e.e_title}
            })
        }
    },
    methods: {
        openSite(e_id) {
            window.open(`${this.current_domain}/_sys/edition-hash-login/?e_id=${e_id}`, '_blank')
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
