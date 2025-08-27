<template>
    <fragment>
        <x-context-menu-item
            v-if="actions.includes('edit')"
            v-show="rows && rows.length===1"
            @click="$emit('edit')"
            :icon="$icons.edit">
            Edit
        </x-context-menu-item>
        <x-context-menu-item
            v-if="rows && rows.length===1 && actions.includes('browse') && rows[0].hasOwnProperty('permalink')"
            @click="$emit('browse')"
            :icon="$icons.external_link">
            Browse
        </x-context-menu-item>
        <x-context-menu-item
            v-if="actions.includes('clone')"
            v-show="rows && rows.length===1"
            @click="$emit('clone')"
            :icon="$icons.clone">
            Clone
        </x-context-menu-item>
        <x-context-menu-item
            v-if="actions.includes('delete')"
            @click="$emit('delete')"
            :icon="$icons.delete">
            Delete completely
        </x-context-menu-item>
    </fragment>
</template>

<script>
export default {
    name: "ReactContextMenu",
    props: {
        actions: {
            default() {
                return ['edit', 'browse', 'clone', 'delete']
            }
        },
        rows: {
            type: Array
        }
    }
}
</script>

<style scoped>

</style>
