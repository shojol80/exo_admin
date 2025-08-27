<template>
    <div class="unit-payload-builder">
        <!-- Form Builder Interface -->
        <div class="payload-form-builder">
            <div class="pb-container">
                <div class="pb-fields-container"
                     :class="{'pb-fields-container--empty': isEmpty}">
                    <PayloadDndContainer
                        v-model="payloadFields"
                        :holder-id="holderId"
                        :holder-parent-type="holderParentType"
                        :holder-parent-id="holderParentId">
                    </PayloadDndContainer>
                </div>
                <div class="pb-types-container">
                    <PayloadFieldTypes></PayloadFieldTypes>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import pictureEmptyValue from '@/shared/pictureEmptyValue'
import UnitPayloadPicture from './UnitPayloadPicture'
import XDateTime from "@/components/XDateTime";
import UnitPayloadDate from "@/components/inputs/field/UnitPayloadDate";
import UnitPayloadSmtp from "@/components/inputs/field/UnitPayloadSmtp";
import PayloadDndContainer from './PayloadBuilder/PayloadDndContainer'
import PayloadFieldTypes from './PayloadBuilder/PayloadFieldTypes'

export default {
    name: 'UnitPayload',
    components: {
        XDateTime,
        UnitPayloadPicture,
        UnitPayloadDate,
        UnitPayloadSmtp,
        PayloadDndContainer,
        PayloadFieldTypes
    },
    model: {
        prop: 'payload',
        event: 'change'
    },
    props: {
        payload: Object,
        holderId: {},   //fq_id, react_id, var_id
        holderParentId: {}, //only for unit react_id, var_id
        holderParentType: {}, //  react, var
    },
    data() {
        return {
            types: [
                {id: 'text', name: 'Text', icon: 'field_text'},
                {id: 'picture', name: 'Picture', icon: 'field_picture'},
                {id: 'container', name: 'Container', icon: 'field_container'},
                {id: 'date', name: 'Date', icon: 'field_date'},
                {id: 'datetime', name: 'DateTime', icon: 'field_datetime'},
                {id: 'textarea', name: 'Textarea', icon: 'field_textarea'},
                {id: 'smtp', name: 'SMTP', icon: 'field_smtp'},
            ]
        }
    },
    computed: {
        isEmpty() {
            return !this.payloadFields || this.payloadFields.length === 0
        },
        payloadFields: {
            get() {
                if (!this.payload) return []
                return Object.keys(this.payload).map(key => ({
                    field_id: key,
                    field_name: key,
                    field_displayname: key,
                    field_type: this.payload[key].type,
                    field_value: this.payload[key].value,
                    field_icon: this.getFieldIcon(this.payload[key].type)
                }))
            },
            set(newFields) {
                const newPayload = {}
                newFields.forEach(field => {
                    newPayload[field.field_name] = {
                        type: field.field_type,
                        value: field.field_value
                    }
                })
                this.$emit('change', newPayload)
            }
        }
    },
    methods: {
        getFieldIcon(type) {
            const typeObj = this.types.find(t => t.id === type)
            return typeObj ? typeObj.icon : 'field_text'
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/vue-component";

.unit-payload-builder {
    // Form Builder Styles
    .payload-form-builder {
        .pb-container {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 1.25rem;
            min-height: 450px;
        }

        .pb-fields-container {
            flex: 1;
            min-height: 450px;
            border: 2px dashed lighten($border-color, 5%);
            border-radius: $border-radius;
            padding: 0;
            background-color: $white;
            transition: border-color 0.2s ease;

            &--empty {
                border-color: lighten($primary, 20%);
                background-color: lighten($primary, 50%);
                position: relative;

                &:after {
                    content: "Drag field types from the right panel to build your payload structure";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: $text-muted;
                    font-style: italic;
                    text-align: center;
                    pointer-events: none;
                    font-size: 1rem;
                    max-width: 280px;
                    line-height: 1.4;
                }
            }

            &:hover {
                border-color: darken($border-color, 5%);
            }
        }

        .pb-types-container {
            width: 280px;
            flex-shrink: 0;
            background-color: $white;
            border: 1px solid $border-color;
            border-radius: $border-radius;
            padding: 1.25rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }
    }
}
</style>
