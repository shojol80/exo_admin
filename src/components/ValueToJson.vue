<template>
    <fragment>
        <slot :jsonValue="modelValue" :input="input"></slot>
    </fragment>
</template>
<script>
import isEmpty from '@modules/isEmpty'
import {isEqual} from 'lodash'

export default {
    name: 'ValueToJson',
    props: {
        value: {},
        emptyObject: {
            type: Function
        }
    },
    data() {
        return {
            modelValue: this.empty()
        }
    },
    watch: {
        value: {
            immediate: true,
            handler(newValue) {
                let value
                if (isEmpty(newValue)) {
                    value = this.empty()
                } else {
                    try {
                        value = JSON.parse(newValue)
                    } catch (e) {
                        value = this.empty()
                    }
                    value = Object.assign(this.empty(), value)
                }
                if (!isEqual(value, this.modelValue)) {
                    this.modelValue = value
                }
            },
        },
        modelValue: {
            deep: true,
            handler() {
                this.$emit('input', JSON.stringify(this.modelValue))
            }
        },
    },
    methods: {
        input(value){
            this.$emit('input', JSON.stringify(value))
        },
        empty() {
            return this.emptyObject()
        }
    }
}
</script>
