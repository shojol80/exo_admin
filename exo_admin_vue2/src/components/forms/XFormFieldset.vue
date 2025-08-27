<template>
    <fieldset class="x-form-fieldset">
        <legend v-if="title" v-html="title"></legend>
        <slot></slot>
    </fieldset>
</template>

<script>

export default {
    name: "XFormFieldset",
    components: {},
    props: {
        title: String,
    },
}
</script>

<style lang="scss" scoped>
@import "src/assets/scss/vue-component";

.x-form-fieldset {
    margin-bottom: 1.25rem;

    > legend {
        color: $primary;
        font-size: 1.1rem;
        font-weight: bold;
        //box-shadow: inset 0 -1px 0 rgba(43, 43, 43, 0.125);
    }
}

.x-form-fieldset:last-child {
    margin-bottom: 0;
}
</style>
