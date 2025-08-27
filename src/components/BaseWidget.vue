<template>
    <b-card :title=title border-variant="primary">
        <b-card-text>
            <slot></slot>
        </b-card-text>
    </b-card>
</template>

<script>
export default {
    name: 'BaseWidget',
    props: {
        title: {
            type: String,
            required: true,
        }
    },
}
</script>

<style scoped>

</style>
