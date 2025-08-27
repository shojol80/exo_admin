<template>
    <span class="collapse-section-sub-title">
        <slot></slot>
    </span>
</template>

<script>

export default {
}
</script>

<style lang="scss">
@import "@/assets/scss/vue-component";

.collapse-section-sub-title {
    font-size: 0.9rem;
    color: $text-muted;
}

</style>
