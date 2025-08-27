<template>
    <waiter ref="tableWaiter">
        <action-table :name="'Sitemap'"
                      ref="table"
                      :columns="columns"
                      :options="options"
                      v-model="reacts"
                      class="sitemap-table">
            <template #beforeFilterWrapper>
                <action-group class="">
                    <action-button
                        @action="switchFilter()"
                        title="Filters by columns"
                        :icon="$icons.filter">
                    </action-button>
                </action-group>
            </template>
            <template #actions="{rows}">
                <action-group>
                    <react-table-actions
                        :actions="['delete','edit']"
                        :rows="rows"
                        @new="reactNew(forms)"
                        @edit="reactEdit(rows)"
                        @delete="reactDelete(rows)">
                    </react-table-actions>
                    <action-button
                        v-show="rows && rows.length>0"
                        @action="updateEdition(rows)"
                        title="Set up a linked edition"
                        :icon="$icons.edition">
                    </action-button>
                    <action-group-separator></action-group-separator>
                    <action-button @action="load"
                                   title="Reload"
                                   :icon="$icons.reload">
                    </action-button>
                </action-group>
            </template>
            <template #col-action="{row}">
                <action-group @click.stop="void 0">
                    <action-button
                        @action="setHomepage([row])"
                        title="Set as homepage"
                        :icon="$icons.homepage">
                    </action-button>
                    <action-button
                        @action="updateEdition([row])"
                        title="Set up a linked edition"
                        :icon="$icons.edition">
                    </action-button>
                    <react-column-actions
                        :actions="['edit','delete']"
                        :row="row"
                        @edit="reactEdit([row])"
                        @browse="reactBrowse([row])"
                        @clone="reactClone([row])"
                        @delete="reactDelete([row])"
                    ></react-column-actions>
                </action-group>
            </template>
            <template #contextmenu="{rows}">
                <x-context-menu-item
                    @click="setHomepage(rows)"
                    :icon="$icons.homepage">
                    Set as homepage
                </x-context-menu-item>
                <x-context-menu-item
                    @click="updateEdition(rows)"
                    :icon="$icons.edition">
                    Set up a linked edition
                </x-context-menu-item>
                <react-context-menu
                    :actions="['edit','delete']"
                    :rows="rows"
                    @edit="reactEdit(rows)"
                    @browse="reactBrowse(rows)"
                    @clone="reactClone(rows)"
                    @delete="reactDelete(rows)"
                ></react-context-menu>
            </template>
            <template #publish="{row,column,update}">
                <x-switch
                    v-if="+row.have_publish===1"
                    size="sm"
                    :value="+row.publish"
                    @change="updateReact(row,$event, column, update)">
                </x-switch>
            </template>
            <template #no_sitemap="{row,column,update}">
                <x-switch
                    v-if="+row.have_no_sitemap===1"
                    size="sm"
                    :value="+row[column]"
                    @change="updateReact(row,$event, column, update)">
                </x-switch>
            </template>
            <template #permalink="{row}">
                <a v-show="!!row.permalink"
                   :href="row.permalink"
                   target="_blank">{{ row.permalink }}
                </a>
            </template>
        </action-table>
    </waiter>
</template>

<script>

import sitemap from '@/services/api/sitemap'
import reacts from '@/services/api/reacts'
import ReactTableActions from '@/components/ReactActions/ReactTableActions'
import reactActions from '@/mixins/reactActions/reactActions'
import ReactColumnActions from '@/components/ReactActions/ReactColumnActions'
import ReactContextMenu from '@/components/ReactActions/ReactContextMenu'
import SelectEditionDialog from '@/components/dialogs/SelectEditionDialog'

export default {
    name: 'SitemapTable',
    components: {ReactContextMenu, ReactColumnActions, ReactTableActions},
    mixins: [reactActions],
    props: {
        e_id: {
            required: false
        },
    },
    data() {
        return {
            reacts: [],
            columns: [
                'col-check',
                'publish',
                'no_sitemap',
                'permalink',
                'react_title',
                'react_form_name',
                'react_id',
                'react_edition_id',
                'col-action'
            ],
            options: {
                editableColumns: ['publish', 'no_sitemap'],
                filterByColumn: true,
                listColumns: {react_form_name: []},
                filterable: false,
                sortable: [
                    //'publish',
                    //'no_sitemap',
                    'permalink',
                    'react_title',
                    'react_form_name',
                    'react_id',
                    'react_edition_id',
                ],
                uniqueKey: 'react_id',
                headings: {
                    'publish': 'Publish',
                    'no_sitemap': 'No sitemp',
                    'react_id': 'ID',
                    'react_title': 'Title',
                    'react_form_name': 'Form',
                    'react_edition_id': 'Edition',
                },
            },
        }
    },
    computed: {
        availableForms() {
            return this.$store.getters['forms/forms']
                .filter(item => item.form_questions.some(fq => fq.fq_name === 'no_sitemap'))
                .map(item => {
                    return {
                        id: item.form_name,
                        text: item.form_name
                    }
                })
        },
    },
    watch: {
        availableForms: {
            immediate: true,
            handler() {
                this.options.listColumns.react_form_name = this.availableForms
            }
        },
        e_id(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.load()
            }
        },
    },
    mounted() {
        this.load()
    },
    methods: {
        switchFilter() {
            if (!this.options.filterable) {
                this.options.filterable = [
                    'permalink',
                    'react_title',
                    'react_form_name',
                    'react_id',
                    'react_edition_id',
                ]

            } else {
                this.$refs.table.setFilter({
                    'permalink': '',
                    'react_title': '',
                    'react_form_name': '',
                    'react_id': '',
                    'react_edition_id':'',
                })
                this.$nextTick(_ => {
                    this.options.filterable = false
                })
            }

        },
        async load() {
            this.reacts = await this.$refs.tableWaiter.wait(sitemap.getReacts({e_id: this.e_id}))
        },
        async updateReact(row, value, column, update) {
            value = +value
            if (+row[column] !== value) {
                update(value)
                await reacts.saveReact({
                    react: {
                        react_id: row.react_id,
                        [column]: value
                    }
                });

            }
        },
        async updateEdition(rows) {

            let current_e_id = undefined
            if (rows.length === 1) {
                current_e_id = rows[0].react_edition_id
            }

            let event = await this.$dialogs.show(SelectEditionDialog, {
                valueFormat: 'id',
                default: current_e_id
            })
            if (event.trigger !== 'ok' || !event.value) return
            await this.$refs.tableWaiter.wait(reacts.updateReactEdition({
                reacts: rows,
                e_id: event.value
            }))
            await this.load()
        },
        async setHomepage(rows) {

            let react_id = undefined
            if (rows.length === 1) {
                react_id = rows[0].react_id
            } else {
                return
            }
            await this.$refs.tableWaiter.wait(reacts.setHomepageReact({react_id}))
            await this.load()
        }
    },

}
</script>

<style lang="scss">
@import "@/assets/scss/vue-component";

.sitemap-table {
    .VueTables__table {
        table-layout: fixed;
    }

    //column sizes
    thead tr:first-child {
        .col-publish {
            width: 81px;
        }

        .col-no_sitemap {
            width: 100px;
        }

        .col-permalink {
            //max-width: auto;
        }

        .col-react_title {
            width: 25%;
        }

        .col-react_form_name {
            width: 150px;
        }

        .col-react_id,
        .col-react_edition_id {
            width: 86px;
        }
    }

    tbody tr:not(.VueTables__filters-row) {

        .col-permalink {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        .col-react_title {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        .col-react_form_name {
            color: $exo-text-secondary;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        .col-react_id,
        .col-react_edition_id {
            color: $exo-text-secondary;
        }
    }
}
</style>
