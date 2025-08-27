<template>
    <div class="unit-payload-smtp">
        <div class="smtp-section">
            <h4 class="smtp-section__title">Value</h4>

            <div class="smtp-fields">
                <!-- Username -->
                <div class="smtp-field">
                    <label class="smtp-field__label">USERNAME</label>
                    <input
                        type="text"
                        class="smtp-field__input"
                        placeholder="smtp@test.2com"
                        v-model="smtpConfig.username">
                </div>

                <!-- Password -->
                <div class="smtp-field">
                    <label class="smtp-field__label">PASSWORD</label>
                    <input
                        type="password"
                        class="smtp-field__input"
                        placeholder="•••"
                        v-model="smtpConfig.password">
                </div>

                <!-- SMTP Host -->
                <div class="smtp-field">
                    <label class="smtp-field__label">SMTP HOST</label>
                    <input
                        type="text"
                        class="smtp-field__input"
                        placeholder="smtp.test.2com"
                        v-model="smtpConfig.host">
                </div>

                <!-- Port -->
                <div class="smtp-field">
                    <label class="smtp-field__label">PORT</label>
                    <input
                        type="number"
                        class="smtp-field__input"
                        placeholder="587"
                        v-model.number="smtpConfig.port">
                </div>
            </div>

            <div class="smtp-test" v-if="isConfigValid">
                <button
                    class="smtp-test__button"
                    :disabled="testing"
                    @click="testConnection">
                    <i v-if="testing" class="fas fa-spinner fa-spin"></i>
                    <i v-else class="fas fa-flask"></i>
                    Test SMTP
                </button>
                <span v-if="testResult" :class="testResultClass">
                    {{ testResult }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UnitPayloadSmtp',
    model: {
        prop: 'value',
        event: 'input'
    },
    props: {
        value: {
            type: Object,
            default: () => ({
                host: '',
                port: 587,
                username: '',
                password: ''
            })
        }
    },
    data() {
        return {
            smtpConfig: {
                host: '',
                port: 587,
                username: '',
                password: ''
            },
            testing: false,
            testResult: null
        }
    },
    computed: {
        isConfigValid() {
            return this.smtpConfig.host &&
                   this.smtpConfig.port &&
                   this.smtpConfig.username &&
                   this.smtpConfig.password
        },
        testResultClass() {
            if (!this.testResult) return ''
            return this.testResult.includes('success') ? 'text-success' : 'text-danger'
        }
    },
    watch: {
        value: {
            immediate: true,
            handler(newValue) {
                if (newValue && typeof newValue === 'object') {
                    this.smtpConfig = {
                        host: newValue.host || '',
                        port: newValue.port || 587,
                        username: newValue.username || '',
                        password: newValue.password || ''
                    }
                }
            }
        },
        'smtpConfig.host'() {
            this.emitChange()
        },
        'smtpConfig.port'() {
            this.emitChange()
        },
        'smtpConfig.username'() {
            this.emitChange()
        },
        'smtpConfig.password'() {
            this.emitChange()
        }
    },
    methods: {
        emitChange() {
            this.$emit('input', { ...this.smtpConfig })
        },

        async testConnection() {
            if (!this.isConfigValid) {
                this.$notify.warning('Please fill in all required SMTP fields')
                return
            }

            this.testing = true
            this.testResult = null

            try {
                // Here you would call an API to test the SMTP connection
                // const response = await smtp.testConnection(this.smtpConfig)

                // For now, just simulate a test
                await new Promise(resolve => setTimeout(resolve, 2000))

                this.testResult = 'Connection test successful!'
                this.$notify.success('SMTP connection test successful!')
            } catch (error) {
                console.error('SMTP connection test failed:', error)
                this.testResult = 'Connection test failed: ' + (error.message || 'Unknown error')
                this.$notify.error('SMTP connection test failed: ' + (error.message || 'Unknown error'))
            } finally {
                this.testing = false
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/vue-component";

.unit-payload-smtp {
    background: $white;
    border-radius: $border-radius;

    .smtp-section {
        padding: 1.5rem;

        &__title {
            color: #17a2b8;
            font-size: 1.25rem;
            font-weight: 500;
            margin: 0 0 1.5rem 0;
        }
    }

    .smtp-fields {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.25rem;
        margin-bottom: 1.5rem;

        @media (max-width: 768px) {
            grid-template-columns: 1fr;
        }
    }

    .smtp-field {
        position: relative;

        &__label {
            display: block;
            color: #17a2b8;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 0.5rem;
        }

        &__input {
            width: 100%;
            padding: 0.875rem 1rem;
            border: 2px solid #e9ecef;
            border-radius: $border-radius;
            font-size: 0.9rem;
            background-color: $white;
            transition: border-color 0.15s ease, box-shadow 0.15s ease;

            &::placeholder {
                color: #6c757d;
                opacity: 0.7;
            }

            &:focus {
                outline: none;
                border-color: #17a2b8;
                box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.15);
            }

            &:hover {
                border-color: darken(#e9ecef, 10%);
            }
        }
    }

    .smtp-test {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-top: 1rem;

        &__button {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            background-color: #17a2b8;
            color: $white;
            border: none;
            border-radius: $border-radius;
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.15s ease, transform 0.1s ease;

            &:hover:not(:disabled) {
                background-color: darken(#17a2b8, 8%);
                transform: translateY(-1px);
            }

            &:active:not(:disabled) {
                transform: translateY(0);
            }

            &:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }

            i {
                font-size: 0.875rem;
            }
        }

        .text-success {
            color: #28a745;
            font-weight: 500;
            font-size: 0.9rem;
        }

        .text-danger {
            color: #dc3545;
            font-weight: 500;
            font-size: 0.9rem;
        }
    }
}
</style>
