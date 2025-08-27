<template>
    <span>
        <label v-if="hasDefaultSlot && labelPosition==='left'" class="x-switch__label mr-2">
            <slot></slot>
        </label>
        <c-switch
            class="x-switch"
            :color="color"
            v-bind="$attrs"
            v-on="$listeners"
            :modelChecked="values==='number'?+value:value"
            :uncheckedValue="uncheckedValue"
            :value="checkedValue"
            dataOn="yes"
            dataOff="no"
        />
        <label v-if="hasDefaultSlot && labelPosition==='right'" class="x-switch__label ml-2">
            <slot></slot>
        </label>
    </span>
</template>

<script>

import HasSlots from '@modules/mixins/HasSlots'

export default {
    name: "XSwitch",
    mixins: [HasSlots],
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        value: null,
        values: {
            default: 'number'
        },
        color: {
            default: 'primary'
        },
        labelPosition: {
            default: 'left'
        }
    },
    data() {
        return {
            uncheckedValue: this.values === 'number' ? 0 : false,
            checkedValue: this.values === 'number' ? 1 : true,
        }
    }
}

</script>

<style lang="scss">
@import "src/assets/scss/vue-component";

.x-switch {
    vertical-align: middle;

    .switch-slider {
        border-color: $input-border-color;

        &:before {
            border-color: $input-border-color;
        }
    }
}

.x-switch__label {
    margin-bottom: 0;
}

</style>
