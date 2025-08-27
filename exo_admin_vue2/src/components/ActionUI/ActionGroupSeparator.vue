<template>
    <div class="action-group-separator"></div>
</template>

<script>
export default {
    name: "ActionGroupSeparator",
}
</script>

<style lang="scss">

@import "src/assets/scss/vue-component";

.action-group-separator {
    //TODO use variable
    border-left: 1px solid rgba(43, 43, 43, 0.125);
    height: 23px;
    margin: 0 0.25rem 0 0.25rem;
    width: 0;
}

</style>
