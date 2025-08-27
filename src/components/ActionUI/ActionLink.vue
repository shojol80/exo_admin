<template>
    <!--v-shortkey="shortkey"-->
    <a
        :href="href"
        :target="target"
        type="button"
        :class="btnClass"
        @shortkey="onAction"
        @click="onAction"
        @keypress.enter="onAction"
        :disabled="disabled"
        v-b-tooltip.hover="{delay:1000}" :title="titleWithShortkey">
        <icon class="action-icon" v-if="!!icon" :icon="icon"></icon>
        <slot></slot>
    </a>
</template>

<script>
import ActionButton from './mixins/ActionButton'

export default {
    name: "ActionLink",
    mixins: [ActionButton],
    props: {
        href: {
            type: String,
        },
        target: {
            default: '_self'
        }
    },
}
</script>

<style lang="scss">
@import "src/assets/scss/vue-component";

.action-button {
    @include action-button;
}
</style>
