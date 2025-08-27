<template>
    <app-screen>
        <waiter ref="tableWaiter">
            <action-table :name="'Domains'"
                          ref="table"
                          table-type="server"
                          :columns="columns"
                          :options="options"
                          class="domains-table">
                <!--Actions-->
                <template #actions="props">
                    <action-group>
                    </action-group>
                </template>
                <template #col-action="props">
                    <action-group @click.stop="void 0">
                        <action-button @action="onActionDelete([props.row])"
                                       :icon="$icons.delete">
                        </action-button>
                    </action-group>
                </template>
                <template #contextmenu="props">
                </template>
                <!--Columns-->
                <template #domain_name="props">
                    <domain-name :domain="props.row"></domain-name>
                </template>
                <template #domain_edition_id="props">
                    <router-link :to="relationLink(props.row)">
                        Edition-{{ props.row.domain_edition_id }}
                    </router-link>
                </template>
                <template #domain_ismail="props">
                    <span v-if="props.row.domain_ismail===1" class="badge badge-success">MAIL</span>
                </template>
            </action-table>

        </waiter>
    </app-screen>
</template>

<script>

import DomainName from '@/components/DomainName'
import {R_EDITION_EDIT} from '@/router/routs'
import domains from '@/services/api/domains'

export default {
    name: "DoaminsTable",
    components: {
        DomainName
    },
    props: {},
    data() {
        return {
            searchQuery: '',
            domains: [],
            columns: [
                //'col-check',
                'domain_id',
                'domain_name',
                'domain_edition_id',
                'domain_ismail'
                //'col-action'
            ],
            options: {
                useFilterSearchQuery: true,
                useFilterByColumn: true,
                filterableColumns: [
                    'domain_id',
                    'domain_name',
                ],
                orderBy: {
                    ascending: false,
                    column: "domain_name"
                },
                requestFunction: this.requestFunction,
                filterable: false,
                sortable: [
                    'domain_id',
                    'domain_name',
                ],
                uniqueKey: 'domain_id',
                headings: {
                    'domain_id': 'ID',
                    'domain_name': 'Domain',
                    'domain_edition_id': 'Relation',
                    'domain_ismail': '',
                },
            },
        }
    },
    methods: {
        load() {
            this.$refs.table.refresh();
        },
        async requestFunction(params) {
            this.loading = true;
            let data = await domains.getDomains(params);
            this.loading = false;
            return data;
        },

        onActionNew() {

        },

        onActionDelete(rows) {


        },

        onActionEdit(rows) {

        },

        onRowClick(e) {

        },

        relationLink(domain) {
            return {
                name: R_EDITION_EDIT,
                params: {'e_id': domain.domain_edition_id}
            }
        }
    },

}
</script>

<style lang="scss">

.domains-table {

    &__search {
        min-width: 250px;
    }

    .col-p_id {
        width: 80px;
    }

    .col-p_title {
        max-width: 300px
    }

    .col-p_date_changed {
        width: 150px;
    }
}
</style>
