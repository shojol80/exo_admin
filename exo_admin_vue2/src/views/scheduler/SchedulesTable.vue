<template>
    <app-screen>
        <waiter ref="tableWaiter" :show="loading">
            <action-table
                name="Schedules"
                ref="table"
                table-type="server"
                :columns="columns"
                :options="options"
                class="schedule-table"
            >
                <!--Actions-->
                <template #actions="props">
                    <action-group>
                        <action-button
                            @action="onActionNew()"
                            title="New schedule"
                            :icon="$icons.new"
                        >
                        </action-button>
                        <action-button
                            v-show="props.rows && props.rows.length === 1"
                            @action="onActionEdit(props.rows)"
                            title="Edit schedule"
                            :icon="$icons.edit"
                        >
                        </action-button>
                        <action-button
                            v-show="props.rows && props.rows.length > 0"
                            @action="onActionInactivate(props.rows)"
                            title="Inactivate schedule"
                            icon="pause"
                        >
                        </action-button>
                        <action-button
                            v-show="props.rows && props.rows.length > 0"
                            @action="onActionActivate(props.rows)"
                            title="Activate schedule"
                            icon="play"
                        >
                        </action-button>
                        <action-button
                            v-show="props.rows && props.rows.length > 0"
                            @action="onActionDelete(props.rows)"
                            title="Delete schedule"
                            icon="delete"
                        >
                        </action-button>
                        <action-group-separator></action-group-separator>
                        <action-button
                            @action="load()"
                            title="Refresh"
                            :icon="$icons.reload"
                        >
                        </action-button>
                    </action-group>
                    <action-group class="ml-auto mr-4">
                        <action-text>
                            All schedules will be executed in the timezone:
                            <span class="text-danger">{{ timezone }}</span>
                        </action-text>
                    </action-group>
                </template>
                <template #col-action="props">
                    <action-group @click.stop="void 0">
                        <action-button
                            @action="onActionEdit([props.row])"
                            title="Edit schedule"
                            :icon="$icons.edit"
                        >
                        </action-button>
                        <action-button
                            v-if="+props.row.status === 1"
                            @action="onActionInactivate([props.row])"
                            title="Inactivate"
                            icon="pause"
                        >
                        </action-button>
                        <action-button
                            v-else
                            @action="onActionActivate([props.row])"
                            title="Activate"
                            icon="play"
                        >
                        </action-button>
                        <action-button
                            @action="onActionDelete([props.row])"
                            title="Delete"
                            icon="delete"
                        >
                        </action-button>
                    </action-group>
                </template>
                <template #contextmenu="props">
                    <x-context-menu-item
                        v-show="props.rows && props.rows.length === 1"
                        @click="onActionEdit(props.rows)"
                        :icon="$icons.edit"
                    >
                        Edit
                    </x-context-menu-item>
                    <x-context-menu-item
                        v-show="
                            props.rows &&
                                props.rows.length === 1 &&
                                props.rows[0].status === '1'
                        "
                        @click="onActionInactivate(props.rows)"
                        icon="pause"
                    >
                        Inactivate
                    </x-context-menu-item>
                    <x-context-menu-item
                        v-show="
                            props.rows &&
                                props.rows.length === 1 &&
                                props.rows[0].status === '0'
                        "
                        @click="onActionActivate(props.rows)"
                        icon="play"
                    >
                        Activate
                    </x-context-menu-item>
                    <x-context-menu-item
                        v-show="props.rows && props.rows.length > 0"
                        @click="onActionDelete(props.rows)"
                        icon="delete"
                    >
                        Delete
                    </x-context-menu-item>
                </template>
                <!--Columns-->
                <template #status="{row}">
                    <span v-if="row.status === '1'" class="badge badge-success"
                        >Active
                    </span>
                    <span v-else class="badge badge-secondary">Inactive </span>
                </template>
                <template #params="{row}">
                    <div class="text-truncate">
                        {{ formatParams(row.params) }}
                    </div>
                </template>
                <template #options="{row}">
                    <div class="text-truncate">
                        {{ formatOptions(row.options) }}
                    </div>
                </template>
                <template #created_at="{row}">
                    {{ formatDate(row.created_at) }}
                </template>
                <template #updated_at="{row}">
                    {{ formatDate(row.updated_at) }}
                </template>
            </action-table>
        </waiter>
    </app-screen>
</template>

<script>
import { R_SCHEDULE_EDIT } from "@modules/routs";
import schedule from "@/services/api/schedule";
import dayjs from "dayjs";

export default {
    name: "SchedulesTable",
    data() {
        return {
            loading:false,
            columns: [
                "col-check",

                "id",
                "command",
                "params",
                "options",
                "expression",
                "status",
                "created_at",
                "updated_at",

                "col-action"
            ],
            options: {
                requestFunction: this.requestFunction,
                useFilterSearchQuery: true,
                useFilterByColumn: true,
                filterableColumns: ["id", "command", "expression", "status"],
                listColumns: {
                    status: [
                        {
                            id: "1",
                            text: "Active"
                        },
                        {
                            id: "0",
                            text: "Inactive"
                        }
                    ]
                },
                sortable: [
                    "id",
                    "command",
                    "expression",
                    "status",
                    "created_at",
                    "updated_at"
                ],
                uniqueKey: "id",
                headings: {
                    id: "ID",
                    command: "Command",
                    params: "Arguments",
                    options: "Options",
                    expression: "Cron Expression",
                    created_at: "Created At",
                    updated_at: "Updated At",
                    status: "Status"
                }
            }
        };
    },
    computed: {
        dayjs() {
            return dayjs;
        },
        timezone() {
            return _.get(
                this.$store,
                "state.exolog.app.database-schedule.timezone"
            );
        }
    },
    mounted() {},
    activated() {
        this.load();
    },
    methods: {
        async requestFunction(params) {
            this.loading = true;
            let data = await schedule.getSchedules(params);
            this.loading = false;
            return data;
        },
        load() {
            this.$refs.table.refresh();
        },

        onActionNew() {
            this.$router.push({
                name: R_SCHEDULE_EDIT,
                params: { schedule_id: "new" }
            });
        },

        async onActionInactivate(rows) {
            await schedule.inactivate({ id: rows.map(row => row["id"]) });
            await this.load();
        },

        async onActionActivate(rows) {
            await schedule.activate({ id: rows.map(row => row["id"]) });
            await this.load();
        },

        onActionEdit(rows) {
            this.$router.push({
                name: R_SCHEDULE_EDIT,
                params: { schedule_id: rows[0]["id"] }
            });
        },

        async onActionDelete(rows) {
            let message;
            if (rows.length === 1) {
                message = `Are you sure want to delete schedule <b>${rows[0]["command"]}</b>?`;
            } else {
                message = `Are you sure want to delete "${rows.length}" schedules?`;
            }
            if (
                (
                    await this.$dialogs.confirmDelete({
                        title: "Delete schedule",
                        message
                    })
                ).trigger !== "ok"
            )
                return;
            await schedule.deleteSchedule({ id: rows.map(row => row["id"]) });
            await this.load();
        },

        onRowClick(e) {},

        formatDate(str) {
            return dayjs(str)
                .utc()
                .format("YYYY-MM-DD HH:mm");
        },
        formatParams(params) {
            return Object.keys(params)
                .reduce((acc, key) => {
                    acc.push(`${key}=${params[key].value}`);
                    return acc;
                }, [])
                .join(", ");
        },

        formatOptions(params) {
            return Object.keys(params)
                .reduce((acc, key) => {
                    if (_.isObject(params[key])) {
                        acc.push(`--${key}=${params[key].value}`);
                    } else {
                        acc.push(`--${key}`);
                    }
                    return acc;
                }, [])
                .join(" ");
        }
    }
};
</script>

<style lang="scss">
.schedule-table {
    .col-id {
        width: 100px;
    }

    .col-status {
        width: 100px;
    }

    .col-params,
    .col-options {
        max-width: 180px;
    }

    .col-created_at,
    .col-updated_at {
        width: 130px;
    }
}
</style>
