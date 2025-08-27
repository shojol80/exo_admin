<template>
    <div class="var-row key-value">
        <div class="key-value__key">
            <b-form-input type="text" placeholder="Enter variable name"
                          :title="title"
                          :value="name"
                          :readonly="readonly"
                          @input="onNameInput"/>
        </div>
        <div class="key-value__value">
            <template v-if="name.startsWith('container_')">
                <action-group>
                    <container-input
                        holder-type="var"
                        :holder-id="id"
                        :value="value">
                    </container-input>
                </action-group>
            </template>
            <template v-else-if="name.startsWith('unit_')">
                <value-to-json :value="value"
                               @input="onValueInput"
                               :empty-object="emptyUnit">
                    <template v-slot="{jsonValue, input}">
                        <unit-input
                            class="compact"
                            :value="jsonValue"
                            @input="input($event)"
                            :holder-id="id"
                            :holder-parent-type="'var'"
                            :holder-parent-id="id"/>
                    </template>
                </value-to-json>
            </template>
            <template v-else-if="name.startsWith('picture_')">
                <value-to-json :value="value"
                               @input="onValueInput"
                               :empty-object="emptyPicture">
                    <template v-slot="{jsonValue, input}">
                        <picture-input
                            class="compact"
                            :value="jsonValue"
                            @input="input($event)"
                        />
                    </template>
                </value-to-json>
            </template>
            <template v-else-if="name.startsWith('search_')">
                <value-to-json :value="value"
                               @input="onValueInput"
                               :empty-object="emptySearch">
                    <template v-slot="{jsonValue, input}">
                        <search-params-input
                            class="compact"
                            :value="jsonValue"
                            @input="input($event)"
                        />
                    </template>
                </value-to-json>
            </template>
            <x-input v-else type="text"
                     placeholder="Enter value"
                     :value="value"
                     :readonly="readonly"
                     @input="onValueInput"
                     :show-editor="!readonly"/>
        </div>
        <div class="key-value__actions">
            <action-group>
                <action-button
                    :icon="$icons.delete"
                    title="Delete varibale"
                    @action="onDelete">
                </action-button>
            </action-group>
        </div>
    </div>
</template>

<script>
import ValueToJson from '@/components/ValueToJson'
import pictureEmptyValue from '@/shared/pictureEmptyValue'
import unitEmptyValue from '@/shared/unitEmptyValue'
import searchParamsEmptyValue from '@/shared/searchParamsEmptyValue'

export default {
    name: "VarRow",
    components: {ValueToJson},
    props: {
        id: '',
        name: '',
        value: '',
        readonly: {
            type: Boolean,
            default: false
        },
        title: ''
    },
    methods: {
        onDelete() {
            this.$emit('delete', this.id)
        },
        onValueInput(value) {
            this.$emit('update', this.id, this.name, value)
        },
        onNameInput(name) {
            this.$emit('update', this.id, name, this.value)
        },

        emptyPicture() {
            return pictureEmptyValue()
        },
        emptyUnit() {
            return unitEmptyValue()
        },
        emptySearch() {
            return searchParamsEmptyValue()
        }
    }
}
</script>

<style lang="scss">
.var-row {
    &:hover {
        .key-value__actions {
            visibility: visible;
        }
    }

    .key-value__actions {
        visibility: hidden;
    }
}
</style>
