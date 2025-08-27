<template>
    <b-form-invalid-feedback
        v-bind="$attrs"
        v-on="$listeners"
        :id="'inputLiveFeedback_'+id">
        {{ errors[0] }}
    </b-form-invalid-feedback>
</template>

<script>
export default {
    name: 'InvalidFeedback',
    props: {
        id: {},
        errors: {type: Array}
    }
}
</script>

<style scoped>

</style>
