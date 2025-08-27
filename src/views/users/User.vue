<template>
    <waiter ref="waiter">
        <ValidationObserver ref="observer" v-slot="{invalid}">
            <action-toolbar>
                <action-group class="mr-2">
                    <action-back></action-back>
                    <action-group-separator></action-group-separator>
                    <ValidationProvider rules="required|email" name="email" slim>
                        <action-input
                            ref="name"
                            slot-scope="{ valid, errors }"
                            title="E-email"
                            v-model="user.u_email"
                            db-field="u_email"
                            :readonly="u_id!=='new'"
                            :valid="valid"
                            :errors="errors"></action-input>
                    </ValidationProvider>
                    <action-button title="Save"
                                   :icon="$icons.save"
                                   @action="save"
                                   shortkey="['ctrl', 's']">
                    </action-button>
                    <action-button :disabled="u_id==='new'"
                                   title="Reload"
                                   :icon="$icons.reload"
                                   @action="load">
                    </action-button>
                    <action-group-separator></action-group-separator>
                    <action-button
                        v-if="allowEmailSetting"
                        :disabled="u_id==='new'"
                        title="User mailbox"
                        :icon="$icons.mailbox"
                        @action="$refs.mailbox.show()">
                    </action-button>
                    <action-group-separator></action-group-separator>
                    <action-button
                        :disabled="u_id==='new'"
                        title="Related reactions" :icon="$icons.react"
                        @action="onReactions">
                    </action-button>
                    <action-download-vcf :u_id="u_id"></action-download-vcf>
                </action-group>
            </action-toolbar>
            <b-tabs class="x-tabs">
                <b-tab ref="propertiesTab" active>
                    <template #title>
                        <icon :icon="$icons.properties"></icon>
                        Properties
                    </template>

                    <x-form-input
                        title="User ID"
                        v-model="user.u_id"
                        db-field="u_id"
                        readonly>
                    </x-form-input>

                    <ValidationProvider rules="email" name="alternative email">
                        <x-form-input
                            slot-scope="{ valid, errors }"
                            aria-autocomplete="none"
                            autocomplete="off"
                            title="Alternative e-mail"
                            v-model="user.u_alt_email"
                            db-field="u_alt_email"
                            :valid="valid"
                            :errors="errors"
                        />
                    </ValidationProvider>

                    <ValidationProvider :rules="u_id==='new'?'required|min:6':'min:6'" name="password">
                        <x-form-password
                            aria-autocomplete="none"
                            autocomplete="off"
                            slot-scope="{ valid, errors }"
                            :valid="valid"
                            :errors="errors"
                            title="Password"
                            db-field="u_password"
                            v-model="user.u_password"
                        />
                    </ValidationProvider>

                    <x-form-group
                        title="2-Step Verification">
                        <b-button variant="primary" :disabled="u_id==='new'"
                                  v-text="user.is_2fa?'Disable':'Enable'" @click="onProceed2FA"></b-button>
                    </x-form-group>

                    <ValidationProvider rules="required" name="language">
                        <x-form-select
                            slot-scope="{ valid, errors }"
                            :valid="valid"
                            :errors="errors"
                            title="Language"
                            :options="langs"
                            v-model="user.u_lang"
                            db-field="u_lang"
                            :allow-empty="false"
                            placeholder="Select language"
                        />
                    </ValidationProvider>

                    <x-form-group
                        title="Usergroups">
                        <select-usergroup
                            v-model="user.usergroups"
                            :multiple="true"
                            valueFormat="object"
                            :flat="true">
                        </select-usergroup>
                    </x-form-group>

                    <x-form-group
                        title="DID"
                        db-field="u_did"
                        class="form-group--input-flex">
                        <span>{{ user.u_did }}</span>
                    </x-form-group>

                    <x-form-group
                        title="Confirmstring"
                        db-field="u_newsletter_confirmstring"
                        class="form-group--input-flex">
                        <span>{{ user.u_newsletter_confirmstring }}</span>
                    </x-form-group>

                    <x-form-group
                        title="Email-bounce"
                        db-field="u_newsletter_count_bounced"
                        class="form-group--input-flex">
                        <span>{{ user.u_newsletter_count_bounced }}</span>
                    </x-form-group>

                </b-tab>
                <b-tab>
                    <template #title>
                        <icon :icon="$icons.variables"></icon>
                        Variables
                    </template>
                    <vars-editor v-model="user.vars"></vars-editor>
                </b-tab>
            </b-tabs>
        </ValidationObserver>
        <b-modal modal-class="modal-primary modal-2fa"
                 size="md"
                 hide-footer
                 centered
                 ref="modal2fa">
        </b-modal>
        <!--TODO migrate to $dialogs-->
        <user-mailbox-aside ref="mailbox" :u_id="u_id" :u_email="user.u_email"></user-mailbox-aside>
    </waiter>
</template>

<script>

import users from '@/services/api/users'
import {R_REACTS_TABLE, R_USER_EDIT} from '@/router/routs'

import auth from '@/services/api/auth'
import ActionDownloadVcf from './parties/ActionDownloadVcf'
import UserMailboxAside from './parties/UserMailboxAside'
import VarsEditor from "@/components/Vars/VarsEditor.vue";
import TwoFactorsSetupDialog from "@/components/dialogs/TwoFactorsSetupDialog.vue";

export default {
    name: 'User',
    components: {VarsEditor, UserMailboxAside, ActionDownloadVcf},
    props: {
        u_id: {
            required: true,
            type: null,
        },
        ug_id: {
            required: true,
            type: null,
            default: 0
        },
    },
    data() {
        return {
            user: {
                u_email: null,
                u_lang: 2,
                vars: [],
                usergroups: []
            },
            emaildata: {
                is_popbox: false,
                password: ''
            },
            originStatePopbox: false,
            //TODO load config
            langs: [
                {label: 'dutch', id: '1'},
                {label: 'english', id: '2'},
                {label: 'russian', id: '3'},
                {label: 'ukrainian', id: '4'}
            ],
        }
    },
    computed: {
        allowEmailSetting() {
            if (!this.user || !this.user.u_email) return false
            if (this.u_id === 'new') return false
            let domain = this.user.u_email.split('@')[1]
            return this.$store.getters['pages/getMailhosts'].indexOf(domain) > -1
        }
    },
    watch: {
        u_id(newVal, oldVal) {
            if (newVal !== oldVal) this.load()
        }
    },

    mounted() {
        this.load()
        this.$store.dispatch('breadcrumb/updateLast', {label: this.$route.params.u_id})
    },

    methods: {
        new() {
            if (this.ug_id) {
                if (this.user.usergroups) {
                    let group = this.$store.state.usergroups.usergroups.find(item => +item.ug_id === +this.ug_id)
                    if (group) {
                        this.user.usergroups.push(group)
                    }
                }
            }

            this.$nextTick(() => {
                this.$refs.name.focus()
            })
        },

        async load() {
            if (this.u_id === 'new') {
                this.new()
                return
            }
            await this.$refs.waiter.wait(async () => {
                    this.user = await users.getUser({u_id: this.u_id})
                }
            )
        },
        async save() {
            const isValid = await this.$refs.observer.validate()

            if (!isValid) {
                this.$refs.propertiesTab.activate()
                return
            }

            await this.$refs.waiter.wait(async () => {
                    let response = await users.saveUser(this.user)
                    if (this.u_id === 'new') {
                        await this.$router.replace({
                            name: R_USER_EDIT,
                            params: {
                                u_id: response.u_id,
                                ug_id: this.ug_id
                            },
                            query: this.$route.query
                        })
                    } else {
                        await this.load()
                    }
                }
            )
        },

        async onProceed2FA() {
            if (this.user.is_2fa) {
                const event = await this.$dialogs.confirm({
                    //variant: 'danger',
                    okTitle: 'DISABLE',
                    message: 'Are you sure want to disable 2-Step Verification?'
                })
                if (event.trigger !== 'ok') return
                await auth.disable2FA({u_id: this.u_id})
                this.user.is_2fa = false
            } else {
                const response = await this.$dialogs.show(TwoFactorsSetupDialog, {
                    u_id: this.u_id
                })
                if (response.trigger !== 'ok') return
                this.user.is_2fa = true
            }
        },

        onReactions() {
            this.$router.push({
                name: R_REACTS_TABLE,
                params: {backRoute: true},
                query: {react_user_email: this.user.u_email}  // Back to email-based filtering
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.modal-2fa {
    .modal-body {
        padding: 0;
    }
}
</style>
