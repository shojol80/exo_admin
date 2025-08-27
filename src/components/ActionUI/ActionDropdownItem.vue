<template>
    <b-dropdown-item
        class="action-dropdown-item"
        v-bind="$attrs"
        v-on="$listeners">
        <icon v-if="icon" :icon="icon" class="dropdown-item-icon"></icon>
        <slot></slot>
    </b-dropdown-item>
</template>

<script>

export default {
    name: "ActionDropdownItem",
    props: {
        icon: {
            type: [Object, String],
            reqired: false
        },
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/vue-component";

.action-dropdown-item {

}
</style>
