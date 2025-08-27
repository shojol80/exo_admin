<template>
    <app-screen>
        <waiter ref="waiter" class="schedule">
            <ValidationObserver ref="observer" v-slot="{invalid}">
                <action-toolbar>
                    <action-group class="mr-2">
                        <action-back :back-route="backRoute"></action-back>
                        <action-group-separator></action-group-separator>
                        <action-button
                            title="Save"
                            :icon="$icons.save"
                            @action="save"
                            shortkey="['ctrl', 's']">
                        </action-button>
                        <action-button
                            :disabled="schedule_id==='new'"
                            title="Reload"
                            :icon="$icons.reload"
                            @action="load">
                        </action-button>
                    </action-group>
                </action-toolbar>
                <b-card class="mt-3"
                        no-header
                        no-footer>
                    <x-form-fieldset>
                        <ValidationProvider
                            slim
                            name="command"
                            rules="required"
                            v-slot="{ errors, valid }">
                            <x-form-select
                                title="Command"
                                v-model="schedule.command"
                                :options="commandsOptions"
                                id-key="name"
                                :valid="valid"
                                :errors="errors"
                                label-key="description"
                                db-field="command"
                                @select="onSelectCommand">
                                <template
                                    #option-label="{ node, labelClassName }">
                                    <label :class="labelClassName">
                                        <span class="font-weight-bold">{{ node.id }}</span> - {{ node.label }}
                                    </label>
                                </template>
                                <template #value-label="{ node }">
                                    <span class="font-weight-bold">{{ node.id }}</span> - {{ node.label }}
                                </template>
                            </x-form-select>
                        </ValidationProvider>


                        <x-form-group
                            v-if="commandObject && commandObject.arguments && commandObject.arguments.length"
                            title="Arguments">
                            <command-arguments
                                :command-object="commandObject"
                                v-model="schedule.params"/>
                        </x-form-group>

                        <x-form-group
                            v-if="commandObject && commandObject.options && commandObject.options.withValue.length"
                            title="Options with Value">
                            <command-options
                                :command-object="commandObject"
                                v-model="schedule.options"/>
                        </x-form-group>

                        <x-form-group
                            v-if="commandObject && commandObject.options && commandObject.options.withoutValue.length"
                            title="Options">
                            <command-options-no-value
                                :command-object="commandObject"
                                v-model="schedule.options"/>
                        </x-form-group>

                        <ValidationProvider
                            slim
                            name="expression"
                            v-slot="{ errors, valid }">
                            <x-form-input
                                :valid="valid"
                                :errors="errors"
                                title="Cron Expression"
                                v-model="schedule.expression"
                                db-field="expression">
                                <template #description>
                                    <a href="https://crontab.cronhub.io/" target="_blank">If necessary click here and
                                        use a
                                        tool to facilitate the creation of the cron expression</a>
                                </template>
                            </x-form-input>
                        </ValidationProvider>

                        <x-form-input
                            title="Log filename"
                            v-model="schedule.log_filename"
                            db-field="log_filename"
                            description="If log file is set, the log messages from this cron are written to storage/logs/<log filename>.log">
                        </x-form-input>

                        <x-form-input
                            title="URL Before"
                            v-model="schedule.webhook_before"
                            db-field="webhook_before">
                        </x-form-input>

                        <x-form-input
                            title="URL After"
                            v-model="schedule.webhook_after"
                            db-field="webhook_after">
                        </x-form-input>

                        <ValidationProvider
                            slim
                            name="email_output"
                            v-slot="{ errors, valid }">
                            <x-form-input
                                :valid="valid"
                                :errors="errors"
                                title="Email for sending output"
                                v-model="schedule.email_output"
                                db-field="email_output">
                            </x-form-input>
                        </ValidationProvider>

                        <x-form-switch
                            title="Send email in case of success to execute the command"
                            label-position="right"
                            v-model="schedule.sendmail_success"
                            db-field="sendmail_success">
                        </x-form-switch>

                        <x-form-switch
                            title="Send email in case of failure to execute the command"
                            label-position="right"
                            v-model="schedule.sendmail_error"
                            db-field="sendmail_error">
                        </x-form-switch>

                        <x-form-switch
                            title="Write command output into history table in case of success to execute the command"
                            label-position="right"
                            v-model="schedule.log_success"
                            db-field="log_success">
                        </x-form-switch>

                        <x-form-switch
                            title="Write command output into history table in case of failure to execute the command"
                            label-position="right"
                            v-model="schedule.log_error"
                            db-field="log_error">
                        </x-form-switch>

                        <x-form-switch
                            title="Even in maintenance mode"
                            label-position="right"
                            v-model="schedule.even_in_maintenance_mode"
                            db-field="even_in_maintenance_mode">
                        </x-form-switch>

                        <x-form-switch
                            title="Without overlapping"
                            label-position="right"
                            v-model="schedule.without_overlapping"
                            db-field="without_overlapping">
                        </x-form-switch>

                        <x-form-switch
                            v-show="false"
                            title="Execute scheduling only on one server"
                            label-position="right"
                            v-model="schedule.on_one_server"
                            db-field="on_one_server">
                        </x-form-switch>

                        <x-form-switch
                            title="Run in background"
                            label-position="right"
                            v-model="schedule.run_in_background"
                            db-field="run_in_background">
                        </x-form-switch>
                    </x-form-fieldset>
                </b-card>
            </ValidationObserver>
        </waiter>
    </app-screen>
</template>

<script>

import {R_SCHEDULE_EDIT, R_SCHEDULER_TABLE} from '@/router/routs'
import schedule from "@/services/api/schedule";
import RuleBuilder from "@/components/Controller/components/formActions/RuleBuilder.vue";
import CommandOptionsNoValue from "@modules/components/schedule-command/CommandOptionsNoValue.vue";
import CommandOptions from "@modules/components/schedule-command/CommandOptions.vue";
import CommandArguments from "@modules/components/schedule-command/CommandArguments.vue";

export default {
    name: 'Schedule',
    components: {RuleBuilder, CommandOptionsNoValue, CommandOptions, CommandArguments},
    props: {
        schedule_id: {
            required: true,
        },
    },
    data() {
        return {
            backRoute: R_SCHEDULER_TABLE,
            schedule: {
                id: null,
                command: null,
                command_custom: '',
                params: [],
                options: {},
                expression: '* * * * *',
                webhook_before: '',
                webhook_after: '',
                email_output: '',
                status: '1',
                log_filename: '',
                groups: '',
                environments: '',
                sendmail_error: false,
                sendmail_success: false,
                log_success: false,
                log_error: false,
                even_in_maintenance_mode: false,
                without_overlapping: false,
                on_one_server: false,
                run_in_background: false,
            },
            commands: []
        }
    },
    computed: {
        commandObject() {
            return this.commands[this.schedule.command]
        },
        commandsOptions() {
            return Object.values(this.commands)
        }
    },
    watch: {
        schedule_id() {
            this.load()
        }
    },

    mounted() {
        this.loadCommands()
        this.load()
        this.$store.dispatch('breadcrumb/updateLast', {label: `Edit schedule: ${this.$route.params.schedule_id}`})
    },

    methods: {
        async load() {
            if (!this.schedule_id) {
                this.$awn.alert('Prop "schedule_id" is not defined!');
                return
            }

            if (this.schedule_id === 'new') {
                return
            }
            await this.$refs.waiter.wait(
                async () => {
                    this.schedule = await schedule.getSchedule({id: this.schedule_id})
                }
            )
        },
        async save() {
            if (!await this.$refs.observer.validate()) return

            await this.$refs.waiter.wait(
                async () => {
                    try {
                        let result = await schedule.saveSchedule({...this.schedule})
                        this.$emit('save')
                        if (this.schedule_id === 'new') {
                            await this.$router.replace({
                                name: R_SCHEDULE_EDIT,
                                params: {
                                    schedule_id: result.id,
                                },
                                query: this.$route.query
                            })
                        } else {
                            await this.load()
                        }
                    } catch (e) {
                        //debugger
                        if (_.get(e, 'response.status') === 422) {
                            const response = e.response
                            const errors = response.data.errors
                            this.$refs.observer.setErrors(errors)
                        } else {
                            throw e
                        }

                    }
                })
        },
        async loadCommands() {
            this.commands = await schedule.commands()
        },
        onSelectCommand(commandObject) {
            this.setDefaultParams(commandObject)
            this.setDefaultOptionsValue(commandObject)
        },
        setDefaultParams(commandObject) {
            const defaults = {}
            if (commandObject && commandObject.arguments) {
                const args = commandObject.arguments
                args.forEach(argument => {
                    defaults[argument.name] = {
                        type: 'string',
                        value: argument.default
                    }
                })
            }
            this.schedule.params = defaults
        },
        setDefaultOptionsValue(commandObject) {
            const defaults = {}
            if (commandObject && commandObject.options && commandObject.options.withValue) {
                const opts = commandObject.options.withValue
                opts.forEach(option => {
                    defaults[option.name] = {
                        type: 'string',
                        value: option.default
                    }
                })
            }
            this.schedule.options = defaults
        }
    },

}
</script>

