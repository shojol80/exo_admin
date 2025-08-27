<template>
    <fragment>
        <action-button
            v-if="actions.includes('edit')"
            @action="$emit('edit')"
            title="Edit"
            :icon="$icons.edit">
        </action-button>
        <action-button
            v-if="actions.includes('browse') && row.hasOwnProperty('permalink')"
            @action="$emit('browse')"
            title="Browse"
            :icon="$icons.external_link">
        </action-button>
        <action-button
            v-if="actions.includes('clone')"
            @action="$emit('clone')"
            title="Clone"
            :icon="$icons.clone">
        </action-button>
        <action-button
            v-if="actions.includes('delete')"
            @action="$emit('delete')"
            title="Delete completely"
            :icon="$icons.delete">
        </action-button>
    </fragment>
</template>

<script>

export default {
    name: 'ReactColumnActions',
    props: {
        actions: {
            default() {
                return ['edit', 'browse', 'clone', 'delete']
            }
        },
        row: {
            type: Object
        }
    }

}
</script>

<style scoped lang="scss">
@import "@/assets/scss/vue-component";

</style>
