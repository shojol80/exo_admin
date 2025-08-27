<template>
    <div class="x-form-control-switch">
        <label :for="idComputed">
            <slot></slot>
        </label>
        <c-switch
            color="primary"
            v-bind="$attrs"
            v-on="xListeners([])"
            :id="idComputed"
            :modelChecked="values==='number'?+value:value"
            :uncheckedValue="uncheckedValue"
            :value="checkedValue"
            dataOn="yes"
            dataOff="no"
            :state="inputState(errors,valid)"
        ></c-switch>
    </div>
</template>

<script>
import xFormControl from '@/components/forms/mixins/xFormControl'

export default {
    name: "XFormControlSwitch",
    mixins: [xFormControl],
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        placeholder: {
            type: String,
            default: ''
        },
        values: {
            default: 'number'
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

<style scoped lang="scss">
@import "src/assets/scss/vue-component";

.x-form-control-switch {
    display: flex;
    padding-top: add($input-padding-y, $input-border-width);
    padding-bottom: add($input-padding-y, $input-border-width);
    margin-bottom: 0; // Override the `<label>/<legend>` default
    @include font-size(inherit); // Override the `<legend>` default
    line-height: $input-line-height;

    > label {
        margin-right: 0.5rem;
        margin-bottom: 0;

        &:empty {
            display: none;
        }
    }

    .switch {
        margin-top: -0.3rem;
    }
}
</style>
