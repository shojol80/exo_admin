<template>
    <span
        class="action-text">
        <icon class="action-icon" v-if="!!icon" :icon="icon"></icon>
        <slot></slot>
    </span>
</template>

<script>
import ActionButton from './mixins/ActionButton'

export default {
    name: "ActionText",
    mixins: [ActionButton],
}
</script>

<style lang="scss">
@import "src/assets/scss/vue-component";

.action-text {
    color: $secondary;
}
</style>
