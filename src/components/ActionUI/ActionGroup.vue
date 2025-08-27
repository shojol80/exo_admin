<template>
    <div class="action-group" :class="{'action-group--right':this.right}" v-on="$listeners">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "ActionGroup",
    props: {
        right: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss">

@import "@/assets/scss/vue-component";

.action-group {
    display: flex;
    padding: 0;
    margin: 0;
    list-style: none;
    align-items: center;
    justify-content: flex-start;

    & > .action-button,
    & > .action-input,
    & > .action-dropdown,
    & > .x-select {
        margin-right: 0.5rem;

        & ~ .action-group-separator {
            margin-left: -.25rem;
        }
    }

    & > .action-button--sm,
    & > .action-input--sm,
    & > .action-dropdown--sm {
        margin-right: 0.1rem;

        & ~ .action-group-separator {
            margin-left: -.05rem;
        }
    }

    & > :last-child {
        margin-right: 0;
    }

    & > .action-group-separator:first-child,
    & > .action-group-separator:last-child, {
        display: none;
    }

    &--right {
        margin-left: auto;
    }

}

</style>
