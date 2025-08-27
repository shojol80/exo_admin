<template>
    <x-switch class="action-switch"
              v-bind="$attrs"
              v-on="$listeners">
        <slot></slot>
    </x-switch>
</template>

<script>

export default {
    name: "ActionSwitch",
    model: {
        prop: 'value',
        event: 'change'
    },
}
</script>

<style lang="scss">
@import "src/assets/scss/vue-component";

.action-switch {
    color: $primary;
}
</style>
