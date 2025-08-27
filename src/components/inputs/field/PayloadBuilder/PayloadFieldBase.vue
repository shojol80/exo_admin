<template>
    <div class="payload-field-base" :class="{'payload-field-base--active': active}" @click="$emit('click')">
        <PayloadFieldHeader>
            <template #default="{hover}">
                <div class="payload-field-base__header-title"
                     @click="collapse($event)">
                    <icon class="payload-field-base__header-icon" :icon="field.field_icon"></icon>
                    {{ field.field_name }}
                </div>
                <span v-show="!(active || hover)" class="payload-field-base__header-displayname">
                    {{ field.field_displayname }}
                </span>
                <div v-show="active || hover" class="payload-field-base__header-actions">
                    <button
                        class="payload-field-base__action-btn payload-field-base__delete-btn"
                        title="Delete field"
                        @click="onActionDelete">
                        <icon :icon="$icons.delete"></icon>
                    </button>
                    <button
                        class="payload-field-base__action-btn payload-field-base__menu-btn"
                        title="More options">
                        <icon :icon="$icons.more_vertical"></icon>
                    </button>
                    <button
                        class="payload-field-base__action-btn payload-field-base__collapse-btn"
                        title="Collapse"
                        @click="collapse($event)">
                        <icon :icon="$icons.collapse_down"></icon>
                    </button>
                </div>
            </template>
        </PayloadFieldHeader>
        
        <b-collapse :visible="active" class="payload-field-base__edit" :id="field.field_id + 'id'">
            <div class="payload-field-base__options">
                <!-- Field Type Selection -->
                <x-form-select
                    title="Type"
                    :options="fieldTypes"
                    id-key="id"
                    zIndex="9999"
                    :clearable="false"
                    label-key="name"
                    v-model="localField.field_type"
                    @input="onTypeChange">
                </x-form-select>

                <!-- Field Name -->
                <x-form-input
                    title="Field Name"
                    v-model="localField.field_name"
                    @input="emitChange">
                </x-form-input>

                <!-- Field Display Name -->
                <x-form-input
                    title="Display Name"
                    v-model="localField.field_displayname"
                    @input="emitChange">
                </x-form-input>

                <!-- Field Value based on type -->
                <div class="payload-field-value">
                    <label class="form-label">Value</label>
                    
                    <!-- Container -->
                    <action-group v-if="localField.field_type === 'container'">
                        <container-input
                            :holder-type="'unit'"
                            :holder-id="holderId"
                            :holder-parent-type="holderParentType"
                            :holder-parent-id="holderParentId"
                            :holder-key="localField.field_name"
                            :value="localField.field_value"
                            @input="onValueChange">
                        </container-input>
                    </action-group>

                    <!-- Picture -->
                    <UnitPayloadPicture
                        v-else-if="localField.field_type === 'picture'"
                        v-model="localField.field_value"
                        @input="emitChange"/>

                    <!-- Date -->
                    <UnitPayloadDate 
                        v-else-if="localField.field_type === 'date'" 
                        type="date" 
                        v-model="localField.field_value"
                        @input="emitChange">
                    </UnitPayloadDate>

                    <!-- DateTime -->
                    <UnitPayloadDate 
                        v-else-if="localField.field_type === 'datetime'" 
                        type="datetime"
                        v-model="localField.field_value"
                        @input="emitChange">
                    </UnitPayloadDate>

                    <!-- SMTP -->
                    <UnitPayloadSmtp 
                        v-else-if="localField.field_type === 'smtp'" 
                        v-model="localField.field_value"
                        @input="emitChange">
                    </UnitPayloadSmtp>

                    <!-- Textarea -->
                    <b-textarea 
                        v-else-if="localField.field_type === 'textarea'" 
                        v-model="localField.field_value" 
                        rows="6"
                        @input="emitChange">
                    </b-textarea>

                    <!-- Text (default) -->
                    <x-input 
                        v-else 
                        v-model="localField.field_value" 
                        :show-editor="true"
                        @input="emitChange">
                    </x-input>
                </div>
            </div>
        </b-collapse>
    </div>
</template>

<script>
import PayloadFieldHeader from './PayloadFieldHeader.vue'
import UnitPayloadPicture from '../UnitPayloadPicture'
import UnitPayloadDate from '../UnitPayloadDate'
import UnitPayloadSmtp from '../UnitPayloadSmtp'

export default {
    name: "PayloadFieldBase",
    components: {
        PayloadFieldHeader,
        UnitPayloadPicture,
        UnitPayloadDate,
        UnitPayloadSmtp
    },
    model: {
        prop: 'field',
        event: 'change'
    },
    props: {
        field: {
            type: Object,
            required: true
        },
        active: {
            type: Boolean,
            default: false
        },
        holderId: {},
        holderParentId: {},
        holderParentType: {}
    },
    data() {
        return {
            localField: {...this.field},
            fieldTypes: [
                {id: 'text', name: 'Text'},
                {id: 'textarea', name: 'Textarea'},
                {id: 'picture', name: 'Picture'},
                {id: 'container', name: 'Container'},
                {id: 'date', name: 'Date'},
                {id: 'datetime', name: 'DateTime'},
                {id: 'smtp', name: 'SMTP'},
            ]
        }
    },
    watch: {
        field: {
            immediate: true,
            deep: true,
            handler(newField) {
                this.localField = {...newField}
            }
        }
    },
    methods: {
        collapse(event) {
            event.stopPropagation()
            this.$emit('collapse')
        },

        onActionDelete() {
            this.$emit('delete')
        },

        emitChange() {
            this.$emit('change', {...this.localField})
        },

        onTypeChange(newType) {
            this.localField.field_type = newType
            this.localField.field_value = this.getDefaultValue(newType)
            this.localField.field_icon = this.getFieldIcon(newType)
            this.emitChange()
        },

        onValueChange(newValue) {
            this.localField.field_value = newValue
            this.emitChange()
        },

        getDefaultValue(type) {
            switch (type) {
                case 'picture':
                    return {
                        picture_id: null,
                        picture_alt: '',
                        picture_title: ''
                    }
                case 'container':
                    return {}
                case 'smtp':
                    return {
                        host: '',
                        port: 587,
                        username: '',
                        password: ''
                    }
                case 'date':
                case 'datetime':
                    return null
                case 'textarea':
                case 'text':
                default:
                    return ''
            }
        },

        getFieldIcon(type) {
            const typeObj = this.fieldTypes.find(t => t.id === type)
            return typeObj ? `field_${type}` : 'field_text'
        }
    }
}
</script>

<style lang="scss">
@import "src/assets/scss/vue-component";

.payload-field-base {
    background: $white;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    margin-bottom: 1rem;
    cursor: pointer;
    transition: border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    &:hover {
        background-color: lighten($primary, 48%);
        border-color: lighten($primary, 25%);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    }

    &--active {
        border-color: $primary;
        box-shadow: 0 0 0 0.2rem rgba($primary, 0.25);
    }

    &__header-title {
        display: flex;
        align-items: center;
        font-weight: 600;
        color: $primary;
        font-size: 0.95rem;
    }

    &__header-icon {
        margin-right: 0.75rem;
        font-size: 1rem;
    }

    &__header-actions {
        margin-left: auto;
        display: flex;
        align-items: center;
        padding-right: 0.25rem;
    }

    &__action-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.75rem;
        height: 1.75rem;
        border: none;
        background: transparent;
        border-radius: 3px;
        color: #6c757d;
        cursor: pointer;
        transition: background-color 0.15s ease, color 0.15s ease;
        margin-left: 0.25rem;

        &:hover {
            background-color: rgba(#6c757d, 0.1);
        }

        i {
            font-size: 0.875rem;
        }
    }

    &__delete-btn {
        color: #17a2b8 !important;

        &:hover {
            background-color: rgba(#17a2b8, 0.1) !important;
            color: #17a2b8 !important;
        }
    }

    &__menu-btn {
        color: #6c757d;

        &:hover {
            background-color: rgba(#6c757d, 0.1);
            color: #6c757d;
        }
    }

    &__collapse-btn {
        color: #6c757d;

        &:hover {
            background-color: rgba(#6c757d, 0.1);
            color: #6c757d;
        }
    }

    &__header-displayname {
        margin-left: auto;
        color: $text-muted;
        font-size: 0.85rem;
        font-style: italic;
    }

    &__edit {
        border-top: 1px solid $border-color;
        background-color: lighten($light, 2%);
    }

    &__options {
        padding: 1.25rem;

        .form-group {
            margin-bottom: 1rem;

            &:last-child {
                margin-bottom: 0;
            }
        }

        .payload-field-value {
            margin-top: 1rem;

            .form-label {
                font-weight: 600;
                color: $primary;
                margin-bottom: 0.5rem;
                font-size: 0.9rem;
            }
        }

        .form-label {
            font-weight: 600;
            color: $body-color;
            margin-bottom: 0.5rem;
            font-size: 0.875rem;
        }
    }
}
</style>
