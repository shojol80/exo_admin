<template>
    <div class="app">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'DefaultContainer',
    computed: {
        name() {
            return (this.$route.meta && this.$route.meta.label) ? this.$route.meta.label : this.$route.name
        },
    }
}
</script>
