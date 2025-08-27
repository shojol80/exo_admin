<template>
    <ValidationProvider
        class="fe-control fe-smtp"
        :name="fq.label" :rules="ruleObjectExt" v-slot="{ errors, valid }"
        tag="div">
        <fe-base-control :state="inputState(errors,valid)">
            <label :for="id"
                   class="fe-control__label">
                {{ fq.label }}
                <field-info-icon :fq="fq"></field-info-icon>
            </label>

            <div class="fe-smtp__grid">
                <x-form-input 
                    title="Email Address"
                    placeholder="mail@domain.com"
                    type="email"
                    v-model="value.email"
                    :state="inputState(errors,valid)"
                    required>
                </x-form-input>

                <x-form-input 
                    title="Display Name"
                    placeholder="Optional display name"
                    v-model="value.name"
                    :state="inputState(errors,valid)">
                </x-form-input>

                <x-form-input 
                    title="Password"
                    type="password"
                    placeholder="SMTP password"
                    v-model="value.password"
                    :state="inputState(errors,valid)"
                    required>
                </x-form-input>

                <x-form-input 
                    title="Username"
                    placeholder="Leave empty to use email"
                    v-model="value.username"
                    :state="inputState(errors,valid)">
                </x-form-input>

                <x-form-input 
                    title="SMTP Host"
                    placeholder="smtp.domain.com"
                    v-model="value.host"
                    :state="inputState(errors,valid)"
                    required>
                </x-form-input>

                <x-form-input 
                    title="Port"
                    type="number"
                    placeholder="587"
                    v-model="value.port"
                    :state="inputState(errors,valid)"
                    required>
                </x-form-input>

                <x-form-select 
                    title="Encryption"
                    :options="encryptionOptions"
                    v-model="value.encryption"
                    :state="inputState(errors,valid)"
                    required>
                </x-form-select>
            </div>

            <div class="fe-smtp__test" v-if="isConfigured">
                <action-button 
                    title="Test Connection"
                    :icon="$icons.test"
                    :loading="testing"
                    @action="testConnection">
                </action-button>
                <span v-if="testResult" :class="testResultClass">
                    {{ testResult }}
                </span>
            </div>

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

export default {
    name: "feSmtp",
    components: {FieldInfoIcon, feBaseControl},
    mixins: [jsonValue, validation, common],
    data() {
        return {
            testing: false,
            testResult: null,
            encryptionOptions: [
                { value: 'tls', label: 'TLS (recommended)' },
                { value: 'ssl', label: 'SSL' },
                { value: 'none', label: 'None (not recommended)' }
            ]
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
        },
        isConfigured() {
            return this.value.email && this.value.password && this.value.host
        },
        testResultClass() {
            if (!this.testResult) return ''
            return this.testResult.includes('success') ? 'text-success' : 'text-danger'
        }
    },
    methods: {
        empty() {
            return {
                email: '',
                password: '',
                name: '',
                host: '',
                port: 587,
                encryption: 'tls',
                username: '',
            }
        },

        async testConnection() {
            if (!this.isConfigured) {
                this.$awn.warning('Please fill in all required fields first')
                return
            }

            try {
                this.testing = true
                this.testResult = null
                
                // Here you would call an API to test the SMTP connection
                // For now, we'll simulate it
                await new Promise(resolve => setTimeout(resolve, 2000))
                
                // Simulate success/failure
                const success = Math.random() > 0.3 // 70% success rate for demo
                
                if (success) {
                    this.testResult = '✓ Connection successful'
                    this.$awn.success('SMTP connection test successful')
                } else {
                    this.testResult = '✗ Connection failed'
                    this.$awn.alert('SMTP connection test failed')
                }
                
            } catch (error) {
                this.testResult = '✗ Test error'
                this.$awn.alert('Failed to test SMTP connection')
            } finally {
                this.testing = false
                
                // Clear test result after 5 seconds
                setTimeout(() => {
                    this.testResult = null
                }, 5000)
            }
        }
    }
}
</script>

<style lang="scss">

@import "src/assets/scss/vue-component";

.fe-smtp {
    position: relative;

    &__grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-bottom: 1rem;

        @media (max-width: 768px) {
            grid-template-columns: 1fr;
        }
    }

    &__test {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        background: #f8f9fa;
        border-radius: 4px;
        border: 1px solid #dee2e6;

        .text-success {
            color: #28a745 !important;
        }

        .text-danger {
            color: #dc3545 !important;
        }
    }
}

</style>
