<template>
    <waiter ref="waiter">
        <ValidationObserver ref="observer" v-slot="{ invalid }">
            <action-toolbar>
                <action-group class="mr-2">
                    <action-back></action-back>
                    <action-group-separator></action-group-separator>
                    <ValidationProvider rules="required" name="title" slim v-slot="{ valid, errors }">
                        <action-input
                            ref="name"
                            :valid="valid"
                            :errors="errors"
                            v-model="edition.e_title"></action-input>
                    </ValidationProvider>
                    <action-button title="Save" :icon="$icons.save" @action="save"
                                   shortkey="['ctrl', 's']"
                                   :disabled="invalid">
                    </action-button>
                    <action-button title="Reload" :icon="$icons.reload"
                                   @action="load"
                                   :disabled="e_id==='new'">
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
                        title="Edition ID"
                        v-model="edition.e_id"
                        db-field="e_id"
                        readonly>
                    </x-form-input>

                    <x-form-group title="Domains">
                        <entity-domain-list
                            v-model="edition.domains">
                        </entity-domain-list>
                    </x-form-group>

                    <x-form-switch
                        title="Site is closed for visitors"
                        v-model="edition.e_isclosed"
                        db-field="e_isclosed">
                    </x-form-switch>
                </b-tab>
                <b-tab>
                    <template #title>
                        <icon :icon="$icons.variables"></icon>
                        Variables
                    </template>
                    <vars-editor
                        v-model="edition.vars">
                    </vars-editor>
                </b-tab>
            </b-tabs>
        </ValidationObserver>
    </waiter>
</template>

<script>
import EntityDomainList from "@/components/statefull/EntityDomainList.vue"
import {R_EDITION_EDIT} from "@/router/routs"
import showDeprecated from '@/mixins/showDeprecated'
import editions from "@/services/api/editions";
import VarsEditor from "@/components/Vars/VarsEditor.vue";

export default {
    name: 'Edition',
    mixins: [showDeprecated],
    components: {
        VarsEditor,
        EntityDomainList,
    },
    props: {
        e_id: [String, Number],
    },
    data() {
        return {
            edition: {
                e_id: null,
                e_isclosed: 0,
                e_title: null,
                e_info: null,
                vars: [],
                domains: [],
            },
        }
    },
    watch: {
        e_id(newVal, oldVal) {
            if (newVal !== oldVal) this.load()
        }
    },
    mounted() {
        this.load()
    },
    methods: {
        new() {
            this.edition.e_title = 'New edition'

            this.$nextTick(() => {
                this.$refs.name.focus()
            })
        },

        async load() {
            if (this.e_id && this.e_id === 'new') {
                this.new()
                return
            }

            await this.$refs.waiter.wait(async () => {
                    this.edition = await editions.getEdition({e_id: this.e_id})
                }
            )
        },
        async save() {
            const isValid = await this.$refs.observer.validate()

            if (!isValid) return

            await this.$refs.waiter.wait(async (_) => {
                    const edition = await editions.saveEdition(this.edition)
                    if (this.e_id === 'new') {
                        await this.$router.replace({name: R_EDITION_EDIT, params: {e_id: edition.e_id}});
                    } else {
                        await this.load()
                    }
                }
            )
        },
    }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/vue-component";

</style>
