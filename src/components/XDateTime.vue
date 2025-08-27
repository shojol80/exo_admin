<template>
    <flat-pickr
        :class="stateClass"
        class="x-date-time form-control"
        v-bind="$attrs"
        v-on="$listeners"
        :value="value">
        <slot v-for="(_, name) in $slots" :name="name" :slot="name"/>
        <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
            <slot :name="name" v-bind="slotData"/>
        </template>
    </flat-pickr>
</template>

<script>

import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
    name: "XDateTime",
    components: {
        flatPickr
    },
    props: {
        value: {
            type: null,
        },
        state: {default: null},
    },

    model: {
        prop: 'value',
        event: 'input'
    },

    data() {
        return {}
    },

    computed: {
        stateClass() {
            return this.state === true ? 'is-valid' : this.state === false ? 'is-invalid' : ''
        }
    },

    methods: {}
}

</script>

<style lang="scss">
@import "src/assets/scss/vue-component";

.flatpickr-day.selected, .flatpickr-day.startRange, .flatpickr-day.endRange, .flatpickr-day.selected.inRange, .flatpickr-day.startRange.inRange, .flatpickr-day.endRange.inRange, .flatpickr-day.selected:focus, .flatpickr-day.startRange:focus, .flatpickr-day.endRange:focus, .flatpickr-day.selected:hover, .flatpickr-day.startRange:hover, .flatpickr-day.endRange:hover, .flatpickr-day.selected.prevMonthDay, .flatpickr-day.startRange.prevMonthDay, .flatpickr-day.endRange.prevMonthDay, .flatpickr-day.selected.nextMonthDay, .flatpickr-day.startRange.nextMonthDay, .flatpickr-day.endRange.nextMonthDay {
    background: $primary;
    border-color: $primary;
}

</style>
