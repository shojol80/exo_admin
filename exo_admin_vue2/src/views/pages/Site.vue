<template>
    <waiter ref="waiter">
        <ValidationObserver ref="observer" v-slot="{ invalid }">
            <action-toolbar>
                <action-group class="mr-2">
                    <action-back></action-back>
                    <action-group-separator></action-group-separator>
                    <ValidationProvider rules="required" name="title" slim>
                        <action-input
                            ref="name"
                            slot-scope="{ valid, errors }"
                            :valid="valid"
                            :errors="errors"
                            readonly
                            v-model="site.site_name"></action-input>
                    </ValidationProvider>
                    <action-button title="Save" :icon="$icons.save" @action="save"
                                   shortkey="['ctrl', 's']"
                                   :disabled="invalid">
                    </action-button>
                    <action-button title="Reload" :icon="$icons.reload"
                                   @action="load"
                    >
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
                        title="Site ID"
                        v-model="site.site_id"
                        db-field="site_id"
                        readonly>
                    </x-form-input>
                    <x-form-input
                        title="Alias"
                        v-model="site.site_alias"
                        db-field="site_alias"
                        readonly>
                    </x-form-input>
                </b-tab>
                <b-tab>
                    <template #title>
                        <icon :icon="$icons.variables"></icon>
                        Variables
                    </template>
                    <x-vars-editor ref="vars" :var_parent="site.site_id" var_type="site"></x-vars-editor>
                </b-tab>
            </b-tabs>
        </ValidationObserver>
    </waiter>
</template>

<script>
import EntityDomainList from "@/components/statefull/EntityDomainList.vue"
import showDeprecated from '@/mixins/showDeprecated'
import site from '@/services/api/site'

export default {
    name: 'Site',
    mixins: [showDeprecated],
    components: {
        EntityDomainList,
    },
    data() {
        return {
            site: {
                vars: []
            },
        }
    },
    computed: {},
    mounted() {
        this.load()
    },
    methods: {
        load() {
            this.$refs.waiter.wait(
                site.getCurrentSite().then(data => this.site = data).then(this.loadNested)
            )
        },
        loadNested() {
            return Promise.all([
                this.$refs.vars.load(),
            ])
        },
        save() {
            this.$refs.observer.validate().then(isValid => {
                if (!isValid) return
                this.$refs.waiter.wait(
                    this.$refs.vars.save()
                )
            });
        },
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/vue-component";

</style>
