<template>
    <div class="search-block-input">
        <icon :icon="$icons.search"></icon>
        <b-form-input v-bind="$attrs"
                      v-on="$listeners">
        </b-form-input>
    </div>
</template>
<script>
export default {
    name: 'search-block-input',
}
</script>
<style scoped lang="scss">
@import "@/assets/scss/vue-component";

.search-block-input {
    position: relative;

    input {
        padding-right: 1.5rem;
    }

    i {
        position: absolute;
        right: 6px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 5;
        color: $gray-300;
    }
}
</style>
