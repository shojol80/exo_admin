<template>
    <waiter ref="waiter">
        <div class="send-mailable">
            <action-toolbar>
                <slot name="before_actions"></slot>
                <action-group>
                    <action-button
                        title="Send"
                        :icon="$icons.send"
                        @action="send"
                        shortkey="['ctrl', 's']">
                    </action-button>
                </action-group>
            </action-toolbar>
            <b-card class="mt-3 mb-0">
                <ValidationObserver ref="observer" v-slot="{ invalid }">
                    <ValidationProvider rules="" vid="type" v-slot="x">
                        <x-form-radio-group
                            title="Send to"
                            v-model="type"
                            :options="sendToOptions"
                            :labelColsLg="3">
                        </x-form-radio-group>
                    </ValidationProvider>
                    <ValidationProvider
                        v-show="type === 'form'"
                        name="form"
                        rules="required_if:type,form">
                        <x-form-group
                            title="Form"
                            :labelColsLg="3"
                            slot-scope="{ valid, errors }">
                            <select-form
                                v-model="form"
                                value-format="object"
                                :required="true"
                                :state="errors[0] ? false : null"
                                :forms="true"
                                :filter="selectForm => selectForm.form_questions.some(question => question.type.fqt_name === 'useremail')">
                            </select-form>
                            <b-form-invalid-feedback id="inputLiveFeedback">
                                {{ errors[0] }}
                            </b-form-invalid-feedback>
                        </x-form-group>
                    </ValidationProvider>
                    <ValidationProvider
                        v-show="type === 'form'"
                        rules="required_if:type,form"
                        name="field">
                        <x-form-select
                            title="Field"
                            v-model="mail.fq_id"
                            id-key="fq_id"
                            label-key="fq_name"
                            placeholder="Select a field"
                            slot-scope="{ valid, errors }"
                            :valid="valid"
                            :errors="errors"
                            :disabled="!form"
                            :labelColsLg="3"
                            :multiple="false"
                            :options="form ? form_val : []">
                        </x-form-select>
                    </ValidationProvider>
                    <ValidationProvider
                        v-show="type === 'form'"
                        name="matchtype">
                        <x-form-group
                            title="Filter"
                            :labelColsLg="3">
                            <react-query-builder
                                :class="{ 'disabled-component': !form }"
                                class="mb-3"
                                :forms="form ? [form.form_id] : []"
                                v-model="mail.QBRules">
                            </react-query-builder>
                        </x-form-group>
                    </ValidationProvider>
                    <ValidationProvider
                        v-show="type === 'usergroup'"
                        rules="required_if:type,usergroup"
                        name="usergroup">
                        <x-form-select
                            title="Usergroup"
                            :options="groups"
                            id-key="ug_id"
                            label-key="ug_name"
                            v-model="mail.ug_id"
                            slot-scope="{ valid, errors }"
                            :valid="valid"
                            :errors="errors"
                            :labelColsLg="3">
                            <template
                                #option-label="{ node, shouldShowCount, count, labelClassName, countClassName }">
                                <label :class="labelClassName">
                                    {{ node.label }}
                                    <span
                                        v-if="node.raw.ug_isnewsletter === '1'"
                                        class="badge badge-primary">
                                        Newsletter group
                                    </span>
                                    <span
                                        v-if="shouldShowCount"
                                        :class="countClassName">
                                        ({{ count }})
                                    </span>
                                </label>
                            </template>
                        </x-form-select>
                    </ValidationProvider>
                    <ValidationProvider
                        v-show="type === 'email'"
                        rules="required_if:type,email|email"
                        name="email"
                        v-slot="{ valid, errors }">
                        <x-form-input
                            title="Email address"
                            v-model="mail.email"
                            :valid="valid"
                            :errors="errors"
                            :labelColsLg="3">
                        </x-form-input>
                    </ValidationProvider>
                    <x-form-group
                        title="Recipients"
                        :labelColsLg="3"
                        class="x-form-group--padding">
                        <b-spinner v-if="recipientCount==='...'" small label="calculate"></b-spinner>
                        <span v-else>
                             {{ recipientCount }}
                       </span>
                    </x-form-group>
                    <x-form-input
                        title="Subject"
                        v-model="mail.subject"
                        placeholder="Use default from react"
                        :labelColsLg="3"/>
                    <x-form-radio-group
                        title="Do you want to schedule or send now?"
                        v-model="sendSchedule"
                        :options="scheduleOptions"
                        :labelColsLg="3">
                    </x-form-radio-group>
                    <x-form-date-time
                        v-show="sendSchedule === 'schedule'"
                        title="Scheduled time to send"
                        v-model="date_scheduled"
                        :config="config"
                        :labelColsLg="3"/>
                </ValidationObserver>
                <x-form-text-area
                    v-show="log"
                    :disabled="true"
                    v-model="log"
                    title="Log"
                    :rows="15"
                    :labelColsLg="3"/>
            </b-card>
        </div>
    </waiter>
</template>

<script>
import dayjs from "dayjs";
import mailable from "@/services/api/mailable";
import ReactQueryBuilder from "@/components/ReactQueryBuilder/ReactQueryBuilder.vue";
import defaultQBRules from "@/shared/defaultQBRules";

export default {
    name: "SendMailable",
    components: {ReactQueryBuilder},
    props: {
        react_id: {
            required: true
        }
    },
    data() {
        return {
            log: null,
            recipientCount: 0,
            mail: {
                react_id: this.react_id,
                ug_id: null,
                email: null,
                subject: null,
                fq_id: null,
                QBRules: defaultQBRules(),
            },
            date_scheduled: dayjs()
                .add(0, "h")
                .toISOString(),
            sendToOptions: [
                {text: "Single email", value: "email"},
                {text: "Usergroup", value: "usergroup"},
                {text: "Form", value: "form"},
            ],
            scheduleOptions: [
                {text: "Send now", value: "now"},
                {text: "Schedule", value: "schedule"}
            ],
            type: "email",
            sendSchedule: "now",
            form: null,
        };
    },
    computed: {
        config() {
            return {
                allowInput: true,
                wrap: false, // set wrap to true only when using 'input-group'
                enableTime: true,
                time_24hr: true,
                altInput: true,
                altFormat: "d.m.Y H:i",
                dateFormat: "Z"
            };
        },
        groups() {
            return this.$store.state.usergroups.usergroups;
        },
        form_val() {
            return this.form.form_questions.filter(field => field.type.fqt_name === 'useremail')
        },
    },
    watch: {
        form() {
            this.mail.fq_id = null
            this.mail.QBRules = defaultQBRules()
        },
        'mail.ug_id': {
            handler() {
                this.getEstimatedRecipient();
            },
        },
        'mail.fq_id': {
            handler() {
                this.getEstimatedRecipient();
            },
        },
        'mail.QBRules': {
            handler() {
                this.getEstimatedRecipient();
            },
            deep: true,
        },
        'mail.email': {
            handler() {
                this.getEstimatedRecipient();
            },
        },
        type: {
            handler() {
                this.getEstimatedRecipient();
            },
        },

    },
    methods: {
        async send() {
            this.log = null;
            let isValid = await this.$refs.observer.validate();
            if (!isValid) return;

            const mail_params = {subject: this.mail.subject, react_id: this.mail.react_id};
            if (this.type === "usergroup" && this.sendSchedule === "now") {
                let response = await this.$dialogs.confirm({
                    message:
                        'You have selected "group" and send "now" for this it is better to use the scheduler. If the group has a large number of recipients it can take a long time and in case of a disconnection not all users get the message.',
                    okTitle: "CONTINUE"
                });
                if (response.trigger !== "ok") return;
            }
            if (this.type === "usergroup") {
                mail_params.ug_id = this.mail.ug_id
            }

            if (this.type === "email") {
                mail_params.email = this.mail.email
            }

            if (this.type === "form") {
                mail_params.fq_id = this.mail.fq_id
                mail_params.QBRules = this.mail.QBRules
            }

            mail_params.scheduled =
                this.sendSchedule === "now" ? null : this.date_scheduled;

            await this.$refs.waiter.wait(async () => {
                const response = await mailable.send(mail_params);
                if (this.sendSchedule !== "now") {
                    this.$awn.success("Mail sent to the queue");
                } else {
                    this.log = JSON.stringify(response, null, 4);
                    if (response.error_count > 0) {
                        this.$awn.warning(
                            "Errors occurred while sending emails, check logs"
                        );
                    } else {
                        this.$awn.success("Mail sent successfully");
                    }
                }
                this.$emit("send", response);
            });
        },
        async getEstimatedRecipient() {
            if (this.type === "email") {
                return this.recipientCount = 1
            }
            this.recipientCount = '...'

            const mail_params = {}

            if (this.type === "usergroup") {
                if (!this.mail.ug_id) {
                    return this.recipientCount = 0
                }
                mail_params.ug_id = this.mail.ug_id
            }

            if (this.type === "form") {
                if (!this.mail.fq_id) {
                    return this.recipientCount = 0
                }
                mail_params.fq_id = this.mail.fq_id
                mail_params.QBRules = this.mail.QBRules
            }

            this.recipientCount = await mailable.estimatedRecipients(mail_params)
        }
    },
    mounted() {
        this.getEstimatedRecipient()
    }
};
</script>

<style scoped lang="scss">
.disabled-component {
    pointer-events: none;
    opacity: 0.6;
}
</style>
