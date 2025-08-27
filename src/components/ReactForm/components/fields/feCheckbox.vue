<template>
    <div class="fe-checkbox">
        <div class="fe-checkbox__input">
            <c-switch
                color="primary"
                :id="id"
                v-model="value"
                :uncheckedValue="'0'"
                :value="'1'"
                dataOn="yes"
                dataOff="no"
                :name="fq.fq_name"
            />
            <label class='fe-checkbox__label' :for="id">
                {{ fq.label }}
                <field-info-icon :fq="fq"></field-info-icon>
            </label>
        </div>
        <invalid-feedback :state="inputState()" :id="id" :errors="inputErrors()"></invalid-feedback>
    </div>
</template>

<script>

import inputs from './mixins/inputs'
import FieldInfoIcon from '@/components/ReactForm/components/FieldInfoIcon'

export default {
    name: "feCheckbox",
    components: {FieldInfoIcon},
    mixins: [inputs],
}
</script>

<style lang="scss">
@import "@/assets/scss/vue-component";

.fe-checkbox {
    &__input {

        display: flex;
        align-items: center;
    }

    &__label {
        margin-left: 0.8rem;
        margin-bottom: 0;
        color: $primary;
        text-transform: uppercase;
        font-weight: normal;
        font-size: 0.8rem;
    }
}
</style>
