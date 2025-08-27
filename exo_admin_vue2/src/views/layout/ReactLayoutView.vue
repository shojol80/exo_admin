<template>
    <app-screen>
        <react-layout-controller :layout="layout"></react-layout-controller>
    </app-screen>
</template>

<script>
import ReactLayoutController from "@/components/ReactLayout/ReactLayoutController";

export default {
    name: 'ReactLayoutView',
    components: {ReactLayoutController},
    props: ['layout']
}
</script>

<style lang="scss">

</style>
