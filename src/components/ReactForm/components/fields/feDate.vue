<template>
    <ValidationProvider class="fe-control fe-date"
                        :name="fq.label"
                        :rules="ruleObject"
                        v-slot="{ errors, valid }" tag="div">
        <div class="fe-date">
            <label class="fe-control__label" :for="id">
                {{ fq.label }}
                <field-info-icon :fq="fq"></field-info-icon>
            </label>
            <x-date-time
                class="fe-control__input"
                :id="id"
                :name="fq.fq_name"
                :placeholder="fq.placeholder"
                v-model="value"
                :config="config"
                :state="inputState(errors,valid)">
            </x-date-time>
            <invalid-feedback :id="id" :errors="inputErrors(errors)"></invalid-feedback>
        </div>
    </ValidationProvider>
</template>

<script>

import inputs from './mixins/inputs'
import XDateTime from '@/components/XDateTime'
import FieldInfoIcon from '@/components/ReactForm/components/FieldInfoIcon'


export default {
    name: "feDate",
    mixins: [inputs],
    components: {FieldInfoIcon, XDateTime},
    data() {
        return {}
    },
    computed: {
        config() {
            return {
                allowInput: true,
                wrap: false, // set wrap to true only when using 'input-group'
                enableTime: this.fq.fqt_name === 'datetime',
                time_24hr: true,
                enableSeconds:true,
                //todo get format from ECO
                dateFormat: this.fq.fqt_name === 'date' ? 'Y-m-d' : 'Y-m-d H:i:S',
            }
        }
    }
}
</script>

<style lang="scss">

</style>
