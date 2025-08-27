<template>
    <ValidationProvider
        class="fe-control fe-mailable"
        :name="fq.label" :rules="ruleObjectExt" v-slot="{ errors, valid }"
        tag="div">
        <fe-base-control :state="inputState(errors,valid)">
            <label :for="id"
                   class="fe-control__label">
                {{ fq.label }}
                <field-info-icon :fq="fq"></field-info-icon>
            </label>

            <x-form-group title="View">
                <div class="fe-mailable__row">
                    <select-view
                        :id="id"
                        :name="fq.fq_name"
                        :placeholder="fq.placeholder"
                        v-model="value.view"
                        :state="inputState(errors,valid)"
                    />
                    <action-edit-view class="ml-1" v-model="value.view"></action-edit-view>
                </div>

            </x-form-group>
            <x-form-select title="From Email"
                           placeholder="Select email configuration"
                           :options="emailOptions"
                           id-key="value"
                           label-key="label"
                           v-model="value.fromEmail"
                           :loading="loadingEmailOptions">
            </x-form-select>

            <x-form-input title="From name"
                          placeholder="By default use from site settings"
                          v-model="value.fromName">
            </x-form-input>

            <x-form-input title="Subject"
                          v-model="value.subject">
            </x-form-input>
        </fe-base-control>
        <invalid-feedback :id="id" :errors="inputErrors(errors)"></invalid-feedback>
    </ValidationProvider>
</template>

<script>

import FieldInfoIcon from '@/components/ReactForm/components/FieldInfoIcon'
import jsonValue from '@/components/ReactForm/components/fields/mixins/jsonValue'
import validation from '@/components/ReactForm/components/fields/mixins/validation'
import common from '@/components/ReactForm/components/fields/mixins/common'
import feBaseControl from '@/components/ReactForm/components/feBaseControl'
import ActionEditView from '@/components/ReactForm/components/ActionEditView'
import exoadmin from '@/services/api/exoadmin'

export default {
    name: "feMailable",
    components: {ActionEditView, FieldInfoIcon, feBaseControl},
    mixins: [jsonValue, validation, common],
    data() {
        return {
            emailOptions: [],
            loadingEmailOptions: false
        }
    },
    computed: {
        react_id() {
            return this.$store.getters['reactForm/react_id']
        },
        ruleObjectExt() {
            return {
                ...this.ruleObject,
                required: true
            }
        }
    },
    mounted() {
        this.loadEmailOptions()
    },
    methods: {
        empty() {
            return {
                fromEmail: null,
                fromName: null,
                subject: null,
            }
        },

        async loadEmailOptions() {
            try {
                this.loadingEmailOptions = true
                console.log('📧 Loading email options...')

                const response = await exoadmin.getEmailOptions()
                console.log('📧 API Response:', response)

                this.emailOptions = response || []
                console.log('📧 Email options loaded:', this.emailOptions.length, 'options')

                // If no email is selected and we have options, select the first one
                if (!this.value.fromEmail && this.emailOptions.length > 0) {
                    this.value.fromEmail = this.emailOptions[0].value
                    console.log('📧 Auto-selected first email:', this.emailOptions[0].value)
                }
            } catch (error) {
                console.error('📧 Failed to load email options:', error)
                this.$awn.warning('Failed to load email configurations')
                // Fallback to text input behavior
                this.emailOptions = []
            } finally {
                this.loadingEmailOptions = false
            }
        }
    }

}
</script>

<style lang="scss">

@import "src/assets/scss/vue-component";

.fe-mailable {
    position: relative;

    &__row {
        display: flex;

        .select-view {
            flex: 1 0 auto;
        }
    }

}

</style>
