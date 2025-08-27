<template>
    <div class="payload-field-header" 
         @mouseenter="hover = true" 
         @mouseleave="hover = false">
        <div class="payload-field-header__content">
            <div class="column-drag-handle payload-field-header__drag">
                <icon :icon="$icons.drag"></icon>
            </div>
            <div class="payload-field-header__main">
                <slot :hover="hover"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PayloadFieldHeader",
    data() {
        return {
            hover: false
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/vue-component";

.payload-field-header {
    padding: 0.875rem 1rem;
    background: $white;
    border-bottom: 1px solid $border-color;
    border-radius: $border-radius $border-radius 0 0;
    transition: background-color 0.15s ease;

    &__content {
        display: flex;
        align-items: center;
        width: 100%;
    }

    &__drag {
        margin-right: 0.75rem;
        color: $text-muted;
        cursor: move;
        font-size: 1rem;
        transition: color 0.15s ease;

        &:hover {
            color: $primary;
        }
    }

    &__main {
        display: flex;
        align-items: center;
        width: 100%;
        min-height: 1.25rem;
    }
}
</style>
