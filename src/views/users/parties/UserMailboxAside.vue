<template>
    <aside-panel
        class="user-mailbox-aside"
        ref="modal">
        <template #actions>
            <action-button
                title="Save"
                :icon="$icons.save"
                @action="() => save(true)">
            </action-button>

        </template>
        <waiter ref="waiter">
            <ValidationObserver ref="observer" v-slot="{invalid}">
                <div class="user-mailbox-aside__body">
                    <b-card class="my-3">
                        <x-form-fieldset
                            :title="`Mailbox of ${u_email} (IMAP/POP)`">

                            <div class="d-flex align-items-start">
                                <x-form-switch
                                    :value="mailbox.is_popbox"
                                    :label-cols-sm="0"
                                    :label-cols-lg="0"
                                    @change="onChangeMailbox">
                                </x-form-switch>
                            </div>
                            <template v-if="mailbox.is_popbox">
                                <ValidationProvider
                                    vid="emailPassProvider"
                                    ref="emailPassProvider"
                                    rules="min:8"
                                    name="password">
                                    <x-form-password
                                        slot-scope="{ valid, errors }"
                                        :valid="valid"
                                        :errors="errors"
                                        title="Password"
                                        db-field=""
                                        v-model="mailbox.password"
                                    >
                                    </x-form-password>
                                </ValidationProvider>
                                <x-form-group>
                                    <action-link
                                        class="d-inline-flex"
                                        title="Open mailbox"
                                        :disabled="isNewMailbox"
                                        target="_blank"
                                        :icon="$icons.external_link"
                                        :href="webmailUrl">
                                        <span class="ml-2" style="margin-top: 3px">View in webmail-client</span>
                                    </action-link>
                                </x-form-group>
                            </template>


                        </x-form-fieldset>
                        <hr>
                        <x-form-fieldset
                            title="Redirect email to another recipient">

                            <x-form-group
                                title="Forward to">
                                <forward-to
                                    v-model="mailbox.mailboxdest"
                                    :aliases.sync="aliases"
                                    :user-email="u_email">
                                </forward-to>
                            </x-form-group>
                            <!-- Send mail to usergroup section hidden as requested -->
                            <!-- <x-form-switch
                                title="Send mail to usergroup"
                                v-model="mailbox.is_maillisting_dest"
                                values="boolean">
                            </x-form-switch>
                            <div v-show="mailbox.is_maillisting_dest">
                                <x-form-group>
                                    <x-form-fieldset title="Usergroups">
                                        <x-form-group
                                            label-cols-sm="4"
                                            label-cols-lg="3"
                                            title="Members usergroup">
                                            <ValidationProvider
                                                vid="mUsergroupProvider"
                                                ref="mUsergroupProvider"
                                                name="usergroup"
                                            >
                                                <div slot-scope="{ valid, errors }">
                                                    <select-usergroup
                                                        id="maillisting_usergroup"
                                                        v-model="mailbox.maillisting_usergroup">
                                                    </select-usergroup>
                                                    <div class="invalid-feedback" style="display: block"
                                                         v-if="errors.length > 0">
                                                        {{ errors[0] }}
                                                    </div>
                                                </div>
                                            </ValidationProvider>
                                        </x-form-group>
                                        <x-form-group
                                            label-cols-sm="4"
                                            label-cols-lg="3"
                                            title="Moderators usergroup">
                                            <select-usergroup id="maillisting_moderatorgroup"
                                                              v-model="mailbox.maillisting_moderatorgroup"></select-usergroup>
                                        </x-form-group>
                                    </x-form-fieldset>
                                </x-form-group>
                            </div> -->
                        </x-form-fieldset>
                    </b-card>
                </div>
            </ValidationObserver>
        </waiter>
    </aside-panel>
</template>

<script>

import AsidePanel from '@/components/containers/components/AsidePanel'
import XMultiselect from '@/components/XMultiselect'

import users from '@/services/api/users'
import ForwardTo from '@/views/users/parties/ForwardTo'

export default {
    name: 'UserMailboxAside',
    components: {ForwardTo, AsidePanel, XMultiselect},
    props: {
        u_id: {
            required: true
        },
        u_email: {
            required: true
        }
    },
    data() {
        return {
            isNewMailbox: true,
            mailbox: {
                password: ''
            },
            aliases: [],
        }
    },
    computed: {
        webmailUrl() {
            if (!this.u_email) {
                return '#';
            }

            // Extract domain from email address
            const emailParts = this.u_email.split('@');
            if (emailParts.length !== 2) {
                return '#';
            }

            const domain = emailParts[1];
            return `https://mail.${domain}/webmail/?_user=${this.u_email}`;
        }
    },
    methods: {

        async show() {
            this.$refs.modal.show()
            this.isNewMailbox = true
            await this.load()
        },

        async onChangeMailbox(value) {
            try {
                if (value === 1 || value === true) {
                    // Enabling mailbox - just update local state
                    this.mailbox.is_popbox = true;
                    return;
                }

                // If disabling mailbox
                if (this.isNewMailbox) {
                    // For new mailbox, just update local state
                    this.mailbox.is_popbox = false;
                    return;
                }

                // For existing mailbox, show warning and confirm deletion
                let response = await this.$dialogs.confirmDelete({
                    okTitle: 'CONFIRM',
                    title: 'Disable Mailbox',
                    message: `Are you sure you want to disable the mailbox for ${this.u_email}? This will delete all emails and cannot be undone. Click Save to apply changes.`
                });

                if (response.trigger !== 'ok') {
                    // User cancelled, keep mailbox enabled
                    this.$nextTick(() => {
                        this.mailbox.is_popbox = true;
                    });
                    return;
                }

                // User confirmed - just update local state, actual deletion happens on save
                this.mailbox.is_popbox = false;

            } catch (error) {
                // Handle errors
                console.error('Error updating mailbox state:', error);
                this.$awn.alert('Failed to update mailbox state. Please try again.');

                // Revert the change on error
                this.$nextTick(() => {
                    this.mailbox.is_popbox = !value;
                });
            }
        },
        async load() {
            console.log('🔄 Loading mailbox data for user:', this.u_id, 'email:', this.u_email);

            let data = await this.$refs.waiter.wait(users.getUserMailbox({u_id: this.u_id}))

            console.log('📥 Raw data received from API:', data);

            if (data.aliases) {
                console.log('📧 Aliases found:', data.aliases);
                this.aliases = data.aliases
            }
            if (data && data.mailbox) {
                console.log('📮 Mailbox data found:', data.mailbox);
                console.log('📮 Original mailboxdest:', data.mailbox.mailboxdest);

                this.mailbox = data.mailbox
                this.mailbox.password = ''

                // Filter out user's own email from mailboxdest to prevent self-forwarding display
                if (this.mailbox.mailboxdest && Array.isArray(this.mailbox.mailboxdest)) {
                    console.log('🔍 Before filtering - mailboxdest:', this.mailbox.mailboxdest);
                    console.log('🔍 User email to filter out:', this.u_email);

                    this.mailbox.mailboxdest = this.mailbox.mailboxdest.filter(dest => {
                        const shouldKeep = dest.name && dest.name.toLowerCase() !== this.u_email.toLowerCase();
                        console.log(`🔍 Checking destination "${dest.name}" - Keep: ${shouldKeep}`);
                        return shouldKeep;
                    });

                    console.log('✅ After filtering - mailboxdest:', this.mailbox.mailboxdest);
                } else {
                    console.log('⚠️ mailboxdest is not an array or is empty:', this.mailbox.mailboxdest);
                }
            } else {
                console.log('⚠️ No mailbox data found in response');
            }
            if (this.mailbox.is_popbox) {
                console.log('📮 Mailbox is enabled (is_popbox = true)');
                this.isNewMailbox = false
            } else {
                console.log('📮 Mailbox is disabled (is_popbox = false)');
            }
        },
        async save(showNotification = false) {
            let isValid = await this.$refs.observer.validate()
            if (!isValid) return

            if (this.mailbox.is_popbox && this.isNewMailbox && this.mailbox.password.length === 0) {
                this.$refs.observer.setErrors({
                    emailPassProvider: ['Password filed is required for create mailbox.'],
                });
                return
            }

            if (this.mailbox['is_maillisting_dest'] && !this.mailbox['maillisting_usergroup']) {
                this.$refs.observer.setErrors({
                    mUsergroupProvider: ['Usergroup is required.'],
                });
                return
            }

            console.log('💾 Saving mailbox data:', {
                u_id: this.u_id,
                mailbox: this.mailbox,
                mailboxdest: this.mailbox.mailboxdest
            });

            try {
                await this.$refs.waiter.wait(
                    users.saveUserMailbox({u_id: this.u_id, mailbox: this.mailbox})
                )

                console.log('✅ Save completed, reloading data...');

                // Reload data after successful save to get updated forward destinations
                await this.load();

                this.isNewMailbox = false

                // Show notification when explicitly requested (manual save button)
                if (showNotification) {
                    if (this.mailbox.is_popbox) {
                        this.$awn.success(`Mailbox enabled and settings saved for ${this.u_email}`);
                    } else {
                        this.$awn.warning(`Mailbox disabled and settings saved for ${this.u_email}`);
                    }
                }
            } catch (error) {
                console.error('❌ Error saving mailbox:', error);

                // Display server validation error message
                if (error.response && error.response.data && error.response.data.message) {
                    this.$awn.alert(error.response.data.message);
                } else if (error.message) {
                    this.$awn.alert(error.message);
                } else {
                    this.$awn.alert('Failed to save mailbox settings. Please try again.');
                }

                // If it's a password validation error, also set form validation
                if (error.response && error.response.data && error.response.data.message &&
                    error.response.data.message.includes('password')) {
                    this.$refs.observer.setErrors({
                        emailPassProvider: [error.response.data.message],
                    });
                }
            }
        },
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/vue-component";


</style>
