<template>
    <app-screen>
        <waiter ref="waiter" :show="loading">
            <action-table
                :name="'newsletters'"
                ref="table"
                table-type="server"
                :columns="columns"
                :options="options"
                @row-click="showReport"
                class="newsletters-table"
            >
                <!--Actions-->
                <template #actions="props">
                    <action-group>
                        <action-button
                            @action="load()"
                            title="Refresh"
                            :icon="$icons.reload"
                        >
                        </action-button>
                    </action-group>
                </template>
                <template #col-action="{row}">
                    <action-group @click.stop="void 0">
                        <action-button
                            v-if="row.rn_status === 'new'"
                            @action="terminate([row])"
                            title="Terminate"
                            :icon="$icons.terminate"
                        >
                        </action-button>
                    </action-group>
                </template>
                <template #contextmenu="{rows}">
                    <x-context-menu-item
                        @click="terminate(rows)"
                        :icon="$icons.terminate"
                    >
                        Terminate
                    </x-context-menu-item>
                </template>
                <!--Columns-->
                <template #rn_date_created="{row}">
                    {{ formatDate(row.rn_date_created) }}
                </template>
                <template #rn_date_scheduled="{row}">
                    {{ formatDate(row.rn_date_scheduled) }}
                </template>
                <template #rn_date_done="{row}">
                    {{ formatDate(row.rn_date_done) }}
                </template>
            </action-table>
        </waiter>
        <mailreport ref="report"></mailreport>
    </app-screen>
</template>

<script>
import newsletters from "@/services/api/newsletters";
import Mailreport from "@/views/newsletters/parties/Mailreport";
import dayjs from "dayjs";
import isEmpty from "@modules/isEmpty";

export default {
    name: "NewslettersTable",
    components: { Mailreport },
    props: {},
    data: function() {
        return {
            loading:false,

            columns: [
                //'col-check',
                "rn_id",
                "usergroup.ug_name",
                "rn_subject",
                "rn_status",
                "rn_date_created",
                "rn_date_scheduled",
                "rn_date_done",
                "col-action"
            ],
            options: {
                useFilterSearchQuery: true,
                useFilterByColumn: true,
                filterableColumns: [
                    "rn_id",
                    "usergroup.ug_name",
                    "rn_status",
                    "rn_subject"
                ],
                listColumns: {
                    rn_status: [
                        {
                            id: "new",
                            text: "new"
                        },
                        {
                            id: "done",
                            text: "done"
                        },
                        {
                            id: "error",
                            text: "error"
                        },
                        {
                            id: "terminated",
                            text: "terminated"
                        }
                    ]
                },
                headings: {
                    rn_id: "ID",
                    "usergroup.ug_name": "User group",
                    rn_subject: "Subject",
                    rn_status: "Status",
                    rn_date_created: "Created",
                    rn_date_scheduled: "Scheduled",
                    rn_date_done: "Done"
                },
                orderBy: {
                    ascending: false,
                    column: "rn_date_scheduled"
                },

                requestFunction: this.requestFunction,
                sortable: [
                    "rn_id",
                    "rn_subject",
                    "rn_status",
                    "rn_date_created",
                    "rn_date_scheduled",
                    "rn_date_done"
                ],
                uniqueKey: "rn_id"
            }
        };
    },
    mounted() {
        this.load();
    },
    methods: {
        load() {
            this.$refs.table.refresh();
        },
        async requestFunction(params) {
            this.loading = true;
            let data = await newsletters.getNewsletters(params);
            this.loading = false;
            return data;
        },
        showReport(e) {
            this.$refs.report.show(e.row.rn_id);
        },
        async terminate(rows) {
            let event = await this.$dialogs.confirmDelete({
                title: "Terminate newsletter",
                message: `Are you sure want to terminate newsletter "${rows[0]["rn_subject"]}" (${rows[0]["rn_id"]})?`
            });
            if (event.trigger !== "ok") return;
            await newsletters.terminate({ rn_id: rows.map(i => i.rn_id) });
            await this.load();
        },
        formatDate(str) {
            if (isEmpty(str)) return null
            return dayjs(str).format("YYYY-MM-DD HH:mm");
        }
    }
};
</script>

<style lang="scss">
.newsletters-table {
    .VueTables__table {
        table-layout: fixed;
    }

    tbody tr:not(.VueTables__filters-row) {
        td:not(.action-table__col-action) {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    }

    //column sizes
    thead tr:first-child {
        .col-rn_id {
            width: 86px;
        }

        .col-usergroup\.ug_name {
            width: 180px;
        }

        .col-rn_subject {
            min-width: 100px; //width: 45px;
        }

        .col-rn_status {
            width: 90px;
        }

        .col-rn_date_created,
        .col-rn_date_scheduled,
        .col-rn_date_done {
            width: 190px;
        }
    }

    &__search {
        min-width: 250px;
    }
}
</style>
