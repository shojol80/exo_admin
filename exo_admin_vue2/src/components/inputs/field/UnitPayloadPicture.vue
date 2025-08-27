<template>
    <picture-input
        v-bind="$attrs"
        v-on="$listeners">
    </picture-input>
</template>
<script>

export default {
    name: 'UnitPayloadPicture',
}
</script>

<style lang="scss">
@import "src/assets/scss/vue-component";

.unit-payload-picture {
    margin: 0;
    border-color: $input-border-color;
}
</style>
