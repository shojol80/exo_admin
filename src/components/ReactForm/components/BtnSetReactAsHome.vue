<template>
    <action-button
        :disabled="isNew"
        title="Use this react as homepage"
        :icon="$icons.homepage"
        @action="setHomepage">
    </action-button>
</template>

<script>

export default {
    name: 'BtnSetReactAsHome',
    computed: {
        formconf() {
            return this.$store.getters['reactForm/formconf']
        },
        isNew() {
            return !this.formconf.react_id
        },
        use_as_homepage() {
            return this.$store.getters['reactForm/use_as_homepage']
        },
    },
    methods: {
        setHomepage() {
            this.$emit('change', '/');
        }
    }
}
</script>

<style lang="scss">
@import "src/assets/scss/vue-component";

</style>
