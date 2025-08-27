<template>
    <font-awesome-icon v-if="type==='FAI'" :icon="iconObj"/>
    <i v-else :class="iconObj" aria-hidden="true"/>
</template>

<script>
import {isObject} from 'lodash'
import icons from './icons'
import isEmpty from '@modules/isEmpty'

export default {
    name: "Icon",
    props: {
        icon: {
            type: [String, Object],
            required: true
        }
    },
    computed: {
        type() {
            if (isObject(this.icon) || (!isEmpty(icons[this.icon]) && isObject(icons[this.icon]))) {
                return 'FAI'
            }
        },
        iconObj() {
            return icons[this.icon] || this.icon
        }
    }
}
</script>

<style scoped>

</style>
