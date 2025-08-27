<template>
    <x-date-time
        v-bind="$attrs"
        v-on="$listeners"
        :config="config"
    >
    </x-date-time>
</template>
<script>

import XDateTime from "@/components/XDateTime";

export default {
    name: 'UnitPayloadDate',
    components: {XDateTime},
    props: {
        type: {
            default: 'date'
        }
    },
    computed: {
        config() {
            return {
                allowInput: true,
                wrap: false, // set wrap to true only when using 'input-group'
                enableTime: this.type === 'datetime',
                time_24hr: true,
                enableSeconds: true,
                //todo get format from ECO
                dateFormat: this.type === 'date' ? 'Y-m-d' : 'Y-m-d H:i:S',
            }
        }
    }
}
</script>

<style lang="scss">
@import "src/assets/scss/vue-component";

.unit-payload-picture {
    margin: 0;
    border-color: $input-border-color;
}
</style>
