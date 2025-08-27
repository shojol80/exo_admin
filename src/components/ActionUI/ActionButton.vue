<template>
    <!--v-shortkey="shortkey"-->
    <button
        type="button"
        :class="btnClass"
        @shortkey="onAction"
        @click="onAction"
        @keypress.enter="onAction"
        :disabled="disabled"
        v-b-tooltip.hover="{delay:1000}" :title="titleWithShortkey">
        <icon class="action-icon" v-if="!!icon" :icon="icon"></icon>
        <slot></slot>
    </button>
</template>

<script>
import ActionButton from './mixins/ActionButton'

export default {
    name: "ActionButton",
    mixins: [ActionButton],
}
</script>

<style lang="scss">
@import "@/assets/scss/vue-component";

.action-button {
    @include action-button;
}
</style>
