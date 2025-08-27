<template>
    <fragment>
        <action-button
            v-if="actions.includes('new')"
            @action="$emit('new')"
            title="New"
            :icon="$icons.new"
            shortkey="['ctrl', 'n']">
        </action-button>
        <action-button
            v-if="actions.includes('edit')"
            v-show="rows && rows.length===1"
            @action="$emit('edit')"
            title="Edit"
            :icon="$icons.edit">
        </action-button>
        <action-button
            v-if="actions.includes('delete')"
            v-show="rows && rows.length>0"
            @action="$emit('delete')"
            title="Delete"
            :icon="$icons.delete">
        </action-button>
    </fragment>
</template>

<script>

export default {
    name: 'ReactTableActions',
    props: {
        actions: {
            default() {
                return ['new', 'edit', 'delete']
            }
        },
        rows: {
            type: Array
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/vue-component";

</style>
