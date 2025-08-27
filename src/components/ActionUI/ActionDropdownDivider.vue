<template>
    <b-dropdown-divider
        v-bind="$attrs">
        <slot></slot>
    </b-dropdown-divider>
</template>

<script>
export default {
    name: 'ActionDropdownDivider',
    inheritAttrs: false
}
</script>
