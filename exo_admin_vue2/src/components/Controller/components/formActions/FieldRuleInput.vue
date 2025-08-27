<template>
    <div>
        <b-input v-show="show" v-bind="$attrs" v-on="$listeners"></b-input>
    </div>
</template>

<script>
export default {
    name: "FieldRuleInput",
    computed: {
        show() {
            return !['is EMPTY', 'is NOT EMPTY', 'is CHANGED'].includes(this.$parent.query.operator)

        }
    }
}
</script>

<style scoped>

</style>
