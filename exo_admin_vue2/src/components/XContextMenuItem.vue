<template>
    <button
        class="dropdown-item"
        v-bind="$attrs"
        v-on="$listeners">
        <icon v-if="icon" :icon="icon" class="dropdown-item-icon"></icon>
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: "XContextMenuItem",
    props: {
        icon: {
            type: [Object, String],
            reqired: false
        },
    }
}
</script>

<style scoped>

</style>
