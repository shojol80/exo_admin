<template>
    <div class="fq-values">
        <div class="" v-for="item in this.fq.values" :key="item.fqv_id">
            <div class="key-value">
                <div class="key-value__key">
                    <b-input-group>
                        <b-input-group-prepend is-text>
                            <b-form-radio class="mr-n2"
                                          :name="'group'+fq.fq_id"
                                          value="1"
                                          @change="setDefault(item)"
                                          v-model="item.fqv_isdefault">
                                <span class="sr-only">Default value</span>
                            </b-form-radio>
                        </b-input-group-prepend>
                        <b-form-input v-model="item.fqv_value"
                                      placeholder="Enter value">
                        </b-form-input>
                    </b-input-group>
                </div>
                <div class="key-value__value">
                    <b-input v-model="item.fqv_displayvalue"
                             placeholder="Enter display value">
                    </b-input>
                </div>
                <div class="key-value__actions">
                    <action-group>
                        <action-button
                            :icon="$icons.value_custom_params"
                            title="Custom param"
                            @action="item.$_visible = !item.$_visible">
                        </action-button>
                        <action-button
                            :icon="$icons.delete"
                            title="Delete option"
                            @action="onDelete(item)">
                        </action-button>
                    </action-group>
                </div>
            </div>
            <b-collapse :id="item.fqv_id.toString()" v-model="item.$_visible">
                <custom-params-input
                    v-model="item.fqv_custom_params">
                </custom-params-input>
            </b-collapse>

        </div>
        <action-button title="Add option" :icon="$icons.add" @action="onAdd">
        </action-button>
    </div>
</template>

<script>

import presetHelper from '@/components/FormBuilder/mixins/presetHelper'

export default {
    name: 'fqValues',
    mixins: [presetHelper],
    props: {
        fq: Object
    },
    computed: {
        fqv() {
            /**TODO Use real model to update values*/
            return this.fq.values
        }
    },

    methods: {
        onAdd() {
            this.fqv.push(this.fqvTemplate())
        },

        setDefault(item) {
            this.fqv.forEach(option => {
                if (option !== item) {
                    option.fqv_isdefault = '0'
                }
            })
        },
        onDelete(item) {
            this.fq.values = this.fq.values.filter(option => item !== option)
        }
    }
}
</script>

<style lang="scss">
.fq-values {
    .custom-params-input {
        padding: 0.45rem 0.45rem;
    }
}

</style>
