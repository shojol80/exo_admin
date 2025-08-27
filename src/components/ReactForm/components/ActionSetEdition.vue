<template>
    <select-edition value-format="id"
                    :multiple="false"
                    :value="edition_id"
                    @select="setEdition"
                    :required="true"
                    :clearable="false"
                    class="action-set-edition"
    />
</template>

<script>

export default {
    name: 'ActionSetEdition',
    computed: {
        edition_id() {
            return this.$store.getters['reactForm/react_edition_id']
        }
    },
    methods: {
        async setEdition(value) {
            if (!value) return
            this.$store.commit('reactForm/setRelationEditionId', value['e_id'])
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/vue-component";

.action-set-edition {
    min-width: 250px;
    max-width: 350px;
}
</style>
