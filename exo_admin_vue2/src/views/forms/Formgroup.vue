<template>
    <waiter ref="waiter">
        <ValidationObserver ref="observer" v-slot="{ invalid }">
            <action-toolbar>
                <action-group class="mr-2">
                    <ValidationProvider rules="required" name="name" slim>
                        <action-input
                            ref="name"
                            slot-scope="{ valid, errors }"
                            :valid="valid"
                            :errors="errors"
                            v-model="group.group_name"></action-input>
                    </ValidationProvider>
                    <action-group-separator></action-group-separator>
                    <action-back></action-back>
                    <action-button title="Save" :icon="$icons.save" @action="save"
                                   shortkey="['ctrl', 's']">
                    </action-button>
                    <action-button title="Reload"
                                   :icon="$icons.reload"
                                   @action="load"
                                   :disabled="group_id==='new'">
                    </action-button>
                </action-group>
            </action-toolbar>
            <b-tabs class="x-tabs">
                <b-tab active>
                    <template #title>
                        <icon :icon="$icons.properties"></icon>
                        Properties
                    </template>

                    <x-form-input
                        title="Formgroup ID"
                        v-model="group.group_id"
                        db-field="group_id"
                        readonly>
                    </x-form-input>

                    <!--<ValidationProvider rules="required" name="name">
                        <x-form-input
                            slot-scope="{ valid, errors }"
                            title="Name"
                            v-model="group.group_name"
                            db-field="group_name"
                            :valid="valid"
                            :errors="errors">
                        </x-form-input>
                    </ValidationProvider>-->

                    <x-form-text-area
                        title="Description"
                        v-model="group.group_info"
                        db-field="group_info">
                    </x-form-text-area>
                </b-tab>
            </b-tabs>
        </ValidationObserver>
    </waiter>
</template>

<script>
import {R_FORMGROUP_EDIT} from "@/router/routs"
import groups from '@/services/api/groups'

export default {
    name: 'Formgroup',
    components: {},
    props: {
        group_id: {
            required: true
        },
    },
    data() {
        return {
            group_type: 'form',
            group: {},
        }
    },
    watch: {
        group_id(newVal, oldVal) {
            if (newVal !== oldVal) this.load()
        }
    },
    mounted() {
        this.load()
    },
    methods: {
        new() {
            this.group = {
                group_name: 'New form group'
            }
            this.$nextTick(() => {
                    this.$refs.name.focus()
                }
            )
        },
        load() {
            if (this.group_id === 'new') {
                this.new()
                return
            }
            this.$refs.waiter.wait(groups.getGroup({
                    group_id: this.group_id,
                    group_type: this.group_type
                })
                    .then(data => this.group = data)
            )
        },

        save() {
            this.$refs.observer.validate().then(isValid => {
                    if (!isValid) return

                    if (this.$route.query.group_parent && +this.$route.query.group_parent !== 0) {
                        this.group.group_parent = this.$route.query.group_parent
                    }
                    this.group.group_type = this.group_type

                    this.$refs.waiter.wait(
                        groups.saveGroup(this.group)
                            .then(data => this.group = data)
                            .then(() => {
                                this.$router.replace({
                                    name: R_FORMGROUP_EDIT,
                                    params: {
                                        group_id: this.group.group_id
                                    }
                                })
                            })
                    )
                }
            )
        },
    }
}
</script>

<style scoped lang="scss">

</style>
