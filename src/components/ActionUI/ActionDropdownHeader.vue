<template>
    <b-dropdown-header
        v-bind="$attrs">
        <slot></slot>
    </b-dropdown-header>
</template>

<script>
export default {
    name: 'ActionDropdownHeader',
    inheritAttrs: false
}
</script>
