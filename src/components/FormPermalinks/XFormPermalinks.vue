<template>
    <waiter
        :show="loading"
        ref="waiter"
        class="x-form-permalinks">
        <action-table :name="'form-permalinks'"
                      v-model="form_permalinks_table"
                      name="Forms"
                      ref="table"
                      :hover-row="false"
                      :columns="columns"
                      :options="options"
                      @update="update"
                      class="form-permalinks-table">
            <!--Actions-->
            <template #actions="props">
                <action-group>
                    <slot name="actionBefore"></slot>
                    <action-button
                        title="Save"
                        :icon="$icons.save"
                        @action="save">
                    </action-button>
                    <action-button
                        @action="load()"
                        title="Refresh"
                        :icon="$icons.reload">
                    </action-button>
                </action-group>
            </template>
            <template #col-action="{row}">
                <action-group @click.stop="void 0">
                    <open-link :link="row.sitemap_index_url"></open-link>
                    <action-button
                        :disabled="!row.fp_id"
                        title="Setup layout"
                        :icon="$icons.layout"
                        @action="editLayout(row)">
                    </action-button>
                    <action-button
                        :disabled="!row.fp_id"
                        title="Generate permalinks"
                        icon="fas fa-hammer"
                        @action="updatePermalinks(row)">
                    </action-button>
                    <action-button
                        :icon="$icons.delete"
                        title="Delete permalink"
                        @action="remove(row)">
                    </action-button>
                </action-group>
            </template>

            <!--Columns-->
            <template #fp_uri="{row,update}">
                <x-input
                    v-model.trim="row.fp_uri"
                    @input="update">
                </x-input>
            </template>
            <template #fp_sitemap_active="{row,update}">
                <x-switch
                    :disabled="!form_sitemap_include"
                    :value="row.fp_sitemap_active"
                    @change="update($event)">
                </x-switch>
            </template>
            <template #fp_sitemap_name="{row,update}">
                <x-input
                    :disabled="!+row.fp_sitemap_active || !form_sitemap_include"
                    :value="row.fp_sitemap_name"
                    @input="update($event)">
                </x-input>
            </template>
            <template #fp_history_active="{row,update}">
                <x-switch
                    :value="row.fp_history_active"
                    @change="update($event)">
                </x-switch>
            </template>
        </action-table>
        <action-group>
            <action-button
                :icon="$icons.add"
                title="Add permalink"
                @action="add">Add permalink
            </action-button>
        </action-group>
    </waiter>
</template>

<script>

import forms from '@/services/api/forms'
import genID from '@modules/mixins/genID'
import OpenLink from '@/components/ReactForm/components/OpenLink'
import {R_REACT_LAYOUT} from "@modules/routs";
import objectToXeditId from "@modules/utils/objectToXeditId";
import {REACT_LAYOUT_SCOPE_FORM_PERMALINK} from "@modules/constants";

export default {
    name: "XFormPermalinks",
    mixins: [genID],
    components: {OpenLink},
    props: {
        form_id: {
            required: true,
        },
    },
    data() {
        return {
            loading: false,
            form_permalinks: [],
            original_form_permalinks: [],
            columns: [
                'fp_id',
                'fp_uri',
                'fp_history_active',
                'fp_sitemap_active',
                'fp_sitemap_name',
                'col-action',
            ],
            options: {
                usePagination: false,
                filterable: false,
                uniqueKey: '$int_id',
                sortable: [],
                editableColumns: [
                    'fp_uri',
                    'fp_history_active',
                    'fp_sitemap_active',
                    'fp_sitemap_name'
                ],
                headings: {
                    'fp_id': 'ID',
                    'fp_uri': 'Permalink',
                    'fp_history_active': 'Add to history',
                    'fp_sitemap_active': 'Add to sitemap',
                    'fp_sitemap_name': 'Sitemap index name',
                },
            },
        }
    },
    computed: {
        form_permalinks_table: {
            get() {
                return this.form_permalinks.filter(item => item.$_deleted !== 1)
            },
            set(value) {
                this.form_permalinks = value
            }
        },
        form_sitemap_include() {
            let form = this.$store.getters['forms/getForm'](this.form_id)
            return form.form_questions.some(fq => fq.fq_name === 'no_sitemap')
        }
    },
    watch: {
        form_id: {
            immediate: true,
            handler() {
                this.load()
            }
        }
    },
    methods: {
        async load() {
            if (!this.form_id) return
            this.loading = true
            try {
                let data = await forms.getFormPermalinks({
                    form_id: this.form_id,
                })
                this.original_form_permalinks = data.form_permalinks

                this.form_permalinks = data.form_permalinks.map(item => {
                    return {
                        $int_id: this.genID(),
                        ...item
                    }
                });
            } finally {
                this.loading = false
            }

        },
        async save() {

            const is_template_changed = this.form_permalinks.some(fp => {
                if (!fp.fp_id) return false
                if (fp.$_deleted) return false
                const ofp = this.original_form_permalinks.find(ofp => ofp.fp_id === fp.fp_id)
                return ofp.fp_uri !== fp.fp_uri;

            })
            let update_permalinks = false;
            if (is_template_changed) {
                let response = await this.$dialogs.confirm({
                    message: 'Some template was changed. Do you want to recalculate related permalinks?',
                    okTitle: 'SAVE AND RECALCULATE',
                    cancelTitle: 'SAVE',
                    hideHeaderClose: false,
                })
                if (response.trigger === 'ok') update_permalinks = true
                if (response.trigger === 'headerclose') return
            }
            try {
                await this.$refs.waiter.wait(forms.saveFormPermalinks({
                    form_id: this.form_id,
                    form_permalinks: this.form_permalinks,
                    update_permalinks
                }))
            } finally {
                await this.load()
            }
        },
        add() {
            this.form_permalinks.push(
                {
                    $int_id: this.genID(),
                    $_inserted: 1,
                    fp_uri: null,
                    fp_history_active: 0,
                    fp_sitemap_active: 0,
                    fp_sitemap_name: null,
                }
            )
        },
        update({row, column, oldVal, newVal}) {
            row.$_updated = 1;
        },
        remove(row) {
            let i = this.form_permalinks.findIndex(item => item.$int_id === row.$int_id)
            this.form_permalinks[i].$_deleted = 1
        },
        async editLayout(row) {
            let response = await this.$dialogs.confirm({message: 'You will be redirected to another screen. All unsaved data will be lost.  Continue?'})
            if (response.trigger !== 'ok') return
            await this.$router.push({
                name: R_REACT_LAYOUT, params: {
                    layout: objectToXeditId({
                        holderId: row.fp_id,
                        holderType: REACT_LAYOUT_SCOPE_FORM_PERMALINK
                    })
                }
            })
        },

        async updatePermalinks(row) {
            let response = await this.$dialogs.confirm({
                message: 'All related permalinks will be recalculated! Please make sure your routing in ' +
                    'the site config setup properly. Continue?',
                okTitle: 'RECALCULATE',
            })
            if (response.trigger !== 'ok') return
            const count = await forms.updatePermalinks({fp_id: row.fp_id})
            this.$awn.info(`${count} reacts updated.`)
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/vue-component";

.x-form-permalinks {
    .form-permalinks-table {
        .col-fp_id {
            width: 60px;
        }

        .col-fp_sitemap_active {
            width: 115px;
        }

        .col-fp_sitemap_name {
            width: 300px;
        }

        .action-table__col-action {
            width: 250px;


            .action-group {
                background-color: transparent;
            }
        }

    }
}

</style>
