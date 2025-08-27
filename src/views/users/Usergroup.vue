<template>
    <waiter ref="waiter">
        <ValidationObserver ref="observer" v-slot="{ invalid }">
            <action-toolbar>
                <action-group>
                    <ValidationProvider rules="required" name="title" slim>
                        <action-input
                            ref="name"
                            slot-scope="{ valid, errors }"
                            :valid="valid"
                            :errors="errors"
                            v-model="usergroup.ug_name"></action-input>
                    </ValidationProvider>
                    <action-group-separator></action-group-separator>
                    <action-button title="Save" :icon="$icons.save" @action="save"
                                   shortkey="['ctrl', 's']">
                    </action-button>
                    <action-button :disabled="ug_id==='new'" title="Reload" :icon="$icons.reload"
                                   @action="load">
                    </action-button>
                </action-group>
            </action-toolbar>
            <b-tabs class="x-tabs">
                <b-tab active>
                    <template slot="title">
                        <icon :icon="$icons.properties"></icon>
                        Properties
                    </template>

                    <x-form-input
                        title="Usergroup ID"
                        v-model="usergroup.ug_id"
                        db-field="ug_id"
                        readonly>
                    </x-form-input>

                    <x-form-input
                        title="Alias"
                        v-model="usergroup.ug_alias"
                        db-field="ug_alias">
                    </x-form-input>

                    <x-form-text-area
                        title="Description"
                        v-model="usergroup.ug_info"
                        db-field="ug_info">
                    </x-form-text-area>

                    <x-form-switch
                        title="Newsletter group"
                        v-model="usergroup.ug_isnewsletter"
                        db-field="ug_isnewsletter">
                    </x-form-switch>

                    <x-form-switch
                        title="Admin group"
                        v-model="usergroup.ug_isadmin"
                        db-field="ug_isadmin">
                    </x-form-switch>

                </b-tab>
                <b-tab>
                    <template #title>
                        <icon :icon="$icons.variables"></icon>
                        Variables
                    </template>
                    <vars-editor
                        v-model="usergroup.vars">
                    </vars-editor>
                </b-tab>
            </b-tabs>
        </ValidationObserver>
    </waiter>
</template>

<script>

import {R_USERGROUP_EDIT} from "@/router/routs"
import users from '@/services/api/users'
import showDeprecated from '@/mixins/showDeprecated'
import VarsEditor from "@/components/Vars/VarsEditor.vue";

export default {
    name: 'Usergroup',
    components: {VarsEditor},
    mixins: [showDeprecated],
    props: {
        ug_id: {
            required: true,
            type: null,
        },
    },
    data() {
        return {
            usergroup: {
                ug_name: null,
                vars:[]
            },
        }
    },
    watch: {
        ug_id(newVal, oldVal) {
            if (newVal !== oldVal) this.load()
        }
    },
    mounted() {
        this.load()
    },
    methods: {
        new() {
            this.usergroup.ug_name = 'New user group'

            this.$nextTick(() => {
                this.$refs.name.focus()
            })
        },

        load() {
            if (this.ug_id === 'new') {
                this.new()
                return
            }
            this.$refs.waiter.wait(async () => {
                    this.usergroup = await users.getUsergroup({ug_id: this.ug_id})
                }
            )
        },

        async save() {

            if (!await this.$refs.observer.validate()) return

            if (this.$route.query.ug_parent && +this.$route.query.ug_parent !== 0) {
                this.usergroup.ug_parent = this.$route.query.ug_parent
            }

            await this.$refs.waiter.wait(async () => {
                const response = await users.saveUsergroup(this.usergroup)
                if (this.ug_id === 'new') {
                    await this.$router.replace({
                        name: R_USERGROUP_EDIT, params: {
                            ug_id: response.ug_id
                        }
                    })
                } else {
                    this.load()
                }
            })
        },
    }
}
</script>
