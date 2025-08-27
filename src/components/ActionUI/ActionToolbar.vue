<template>
    <div class="action-toolbar"
         :class="{'action-toolbar--sticky':sticky,
                  'action-toolbar--no-border': !border}">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "ActionToolbar",
    props: {
        sticky: {
            type: Boolean,
            default: true
        },
        border: {
            type: Boolean,
            default: true
        },
    }
}
</script>

<style lang="scss">
@import "src/assets/scss/vue-component";

.action-toolbar {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: $exo-bg;
    border-bottom: 1px solid $exo-bg;
    box-shadow: inset 0 -1px 0 $exo-gray-line;
    padding: 0.5rem 0;

    &--sticky {
        position: sticky;
        top: 0;
        z-index: 1020;
    }

    &--no-border {
        box-shadow: none;
    }

    > .action-group-separator:first-child,
    > .action-group-separator:first-child {
        display: none;
    }
}
</style>
