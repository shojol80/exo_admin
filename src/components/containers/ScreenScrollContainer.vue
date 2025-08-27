<template>
    <div class="screen-scroll-container" :class="classes">
        <div v-bar class="screen-scroll-container__scroll-area">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ScreenScrollContainer',
    props: {
        heightOption: {
            type: Number,
            default: 1,
        }
    },
    computed: {
        classes() {
            return {
                'screen-scroll-container--height-2': this.heightOption === 2,
                'screen-scroll-container--height-3': this.heightOption === 3,
            }
        }
    }
}
</script>
<style lang="scss">
@import "@/assets/scss/vue-component";

.screen-scroll-container {
    position: sticky;
    top: calc(#{$app-header-height} + #{$rm-px-1});
    height: calc(100vh - #{$app-header-height} - #{$action-toolbar-height} - #{$rm-px-1} * 2);
    overflow-y: auto;

    &--height-2 {
        height: calc(100vh - #{$app-header-height} - #{$action-toolbar-height} - #{$tab-toolbar-height} - #{$rm-px-1});
    }

    &--height-3 {
        height: calc(100vh - #{$app-header-height} - #{$action-toolbar-height} - #{$tab-toolbar-height} - #{$rm-px-1} - 0.5rem);
    }

    &__scroll-area {
        height: 100%;
    }
}

</style>
