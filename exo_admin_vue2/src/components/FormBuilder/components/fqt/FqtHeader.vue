<template>
    <div class="fqt-header"
         @mouseover="hover = true"
         @mouseleave="hover = false">
        <div class="column-drag-handle">
            <icon :icon="$icons.dragable"></icon>
        </div>
        <slot v-bind="{hover}"></slot>
    </div>
</template>

<script>
export default {
    name: 'FqtHeader',
    data() {
        return {
            hover: false,
        }
    }
}
</script>

<style scoped lang="scss">

@import "src/assets/scss/vue-component";

.fqt-header {
    padding: 0.5rem $list-group-item-padding-x;
    position: relative;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-height: 51px;

    .column-drag-handle {
        color: $gray-400;
        cursor: move;
        position: absolute;
        left: 3px;
        top: 50%;
        transform: translateY(-50%);
        width: 21px;
    }
}
</style>
