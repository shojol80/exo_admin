<template>
    <b-form-checkbox-group
        v-model="localValue"
        :options="commandObject.options.withoutValue"
        stacked
    ></b-form-checkbox-group>
</template>
<script>

export default {
    name: 'command-options-no-value',
    props: {
        commandObject: {},
        value: {}
    },
    data() {
        return {
            localValue: []
        }
    },
    watch: {
        value: {
            immediate: true,
            deep: true,
            handler() {
                let newValue = Object.keys(this.value).reduce((acc, field) => {
                    if (!_.isObject(this.value[field])) {
                        acc.push(field)
                    }
                    return acc
                }, [])

                if (_.isEqual(this.localValue, newValue)) {
                    return
                }
                this.localValue = newValue
            }
        },
        localValue: {
            deep: true,
            handler() {
                let value = Object.keys(this.value).reduce((acc, field) => {
                    if (_.isObject(this.value[field])) {
                        acc[field] = this.value[field]
                    }
                    return acc
                }, {})
                this.localValue.forEach(i => {
                    value[i] = "on"
                })

                this.$emit('input', value)
            }
        }
    },
}
</script>
