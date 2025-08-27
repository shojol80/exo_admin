<template>
    <app-screen>
        <div class="controller-view">
            <controller :container="container"></controller>
        </div>
    </app-screen>
</template>

<script>
import Controller from '@/components/Controller'

export default {
    name: 'ControllerView',
    components: {Controller},
    props: ['container']
}
</script>

<style lang="scss">

</style>
