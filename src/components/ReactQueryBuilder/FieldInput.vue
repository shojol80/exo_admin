<template>
    <div class="field-input">
        <b-input v-show="show" v-bind="$attrs" v-on="$listeners"></b-input>
        <info-icon v-show="!!help">{{ help }}</info-icon>
    </div>
</template>

<script>
export default {
    name: "FieldInput",
    computed: {
        operator() {
            return this.$parent.query.operator;
        },
        show() {
            return !['EMPTY', 'NOT EMPTY',].includes(this.operator)
        },
        help() {
            if (['LIKE', 'NOT LIKE'].includes(this.operator)) {
                return 'Use %  as wildcard. Example: "Product%"'
            }
            if (['IN', 'NOT IN'].includes(this.operator)) {
                return 'Use "," as delimiter. Example: "4423,44334,23423"'
            }
        }
    }
}
</script>

<style scoped lang="scss">
.field-input {
    position: relative;

    .form-control {
        width: 100%;
        padding-right: 2rem;
    }

    .info-icon {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
    }
}
</style>
