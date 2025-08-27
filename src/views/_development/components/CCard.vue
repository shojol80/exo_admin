<template>
    <b-card>
        <div slot="header">
            <strong>{{ header }}</strong>
        </div>
        <slot></slot>
    </b-card>
</template>

<script>
export default {
    name: 'CCard',
    props:{
        header:{}
    }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/vue-component";

</style>
