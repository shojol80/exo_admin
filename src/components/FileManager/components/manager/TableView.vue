<template>
    <div class="fm-table action-table action-table--hover action-table--row-pointer">
        <table class="table table-borderless table-sm">
            <thead>
            <tr class="action-table__heading-row">
                <th class="w-65" @click="sortBy('name')">
                    {{ lang.manager.table.name }}
                    <span class="action-table__sort-icon">
                        <template v-if="sortSettings.field === 'name'">
                        <i class="fa fa-sort-desc"
                           v-show="sortSettings.direction === 'down'"></i>
                        <i class="fa fa-sort-asc"
                           v-show="sortSettings.direction === 'up'"></i>
                        </template>
                        <template v-else>
                            <i class="fa fa-sort"></i>
                        </template>
                    </span>
                </th>
                <th class="w-10" @click="sortBy('size')">
                    {{ lang.manager.table.size }}
                    <span class="action-table__sort-icon">
                        <template v-if="sortSettings.field === 'size'">
                        <i class="fa fa-sort-desc"
                           v-show="sortSettings.direction === 'down'"></i>
                        <i class="fa fa-sort-asc"
                           v-show="sortSettings.direction === 'up'"></i>
                        </template>
                        <template v-else>
                            <i class="fa fa-sort"></i>
                        </template>
                    </span>
                </th>
                <th class="w-10" @click="sortBy('type')">
                    {{ lang.manager.table.type }}
                    <span class="action-table__sort-icon">
                        <template v-if="sortSettings.field === 'type'">
                        <i class="fa fa-sort-desc"
                           v-show="sortSettings.direction === 'down'"></i>
                        <i class="fa fa-sort-asc"
                           v-show="sortSettings.direction === 'up'"></i>
                        </template>
                        <template v-else>
                            <i class="fa fa-sort"></i>
                        </template>
                    </span>
                </th>
                <th class="w-10" @click="sortBy('path')">
                    {{ lang.manager.table.id }}
                    <span class="action-table__sort-icon">
                        <template v-if="sortSettings.field === 'path'">
                        <i class="fa fa-sort-desc"
                           v-show="sortSettings.direction === 'down'"></i>
                        <i class="fa fa-sort-asc"
                           v-show="sortSettings.direction === 'up'"></i>
                        </template>
                        <template v-else>
                            <i class="fa fa-sort"></i>
                        </template>
                    </span>
                </th>
                <th class="w-auto" @click="sortBy('date')">
                    {{ lang.manager.table.date }}
                    <span class="action-table__sort-icon">
                        <template v-if="sortSettings.field === 'date'">
                        <i class="fa fa-sort-desc"
                           v-show="sortSettings.direction === 'down'"></i>
                        <i class="fa fa-sort-asc"
                           v-show="sortSettings.direction === 'up'"></i>
                        </template>
                        <template v-else>
                            <i class="fa fa-sort"></i>
                        </template>
                    </span>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="!isRootPath">
                <td colspan="4" class="fm-content-item" @click="levelUp" @dblclick="levelUp">
                    <i class="fas fa-level-up-alt"></i>
                </td>
            </tr>
            <tr v-for="(directory, index) in directories"
                :key="`d-${index}`"
                :class="{'table-primary': checkSelect('directories', directory.path)}"
                @click="selectItem('directories', directory.path, $event)"
                @contextmenu.prevent="contextMenu(directory, $event)">
                <td class="fm-content-item unselectable"
                    :class="(acl && directory.acl === 0) ? 'text-hidden' : ''"
                    @dblclick="selectDirectory(directory.path)">
                    <icon :icon="$icons.folder"></icon> {{ directory.basename }}
                </td>
                <td></td>
                <td>{{ lang.manager.table.folder }}</td>
                <td>{{directory.path}}</td>
                <td>
                    {{ timestampToDate(directory.timestamp) }}
                </td>
            </tr>
            <tr v-for="(file, index) in files"
                :key="`f-${index}`"
                :class="{'table-primary': checkSelect('files', file.path)}"
                @click="selectItem('files', file.path, $event)"
                @dblclick="selectAction(file.path, file.extension)"
                @contextmenu.prevent="contextMenu(file, $event)">
                <td class="fm-content-item unselectable"
                    :class="(acl && file.acl === 0) ? 'text-hidden' : ''">
                    <i class="far" :class="extensionToIcon(file.extension)"></i>
                    {{ file.filename ? file.filename : file.basename }}
                </td>
                <td>{{ bytesToHuman(file.size) }}</td>
                <td>
                    {{ file.extension }}
                </td>
                <td>
                    {{ file.path }}
                </td>
                <td>
                    {{ timestampToDate(file.timestamp) }}
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import translate from './../../mixins/translate';
import helper from './../../mixins/helper';
import managerHelper from './mixins/manager';

export default {
    name: 'table-view',
    mixins: [translate, helper, managerHelper],
    props: {
        manager: {type: String, required: true},
    },
    computed: {
        /**
         * Sort settings
         * @returns {*}
         */
        sortSettings() {
            return this.$store.state.fm[this.manager].sort;
        },
    },
    methods: {
        /**
         * Sort by field
         * @param field
         */
        sortBy(field) {
            this.$store.dispatch(`fm/${this.manager}/sortBy`, {field, direction: null});
        },
    },
};
</script>

<style lang="scss">
@import "@/assets/scss/vue-component";

.fm-table {
    thead th {
        background: $exo-bg;
        position: sticky;
        top: 0;
        z-index: 1;
        cursor: pointer;
        border: none;

        & > i {
            padding-left: 0.5rem;
        }
    }

    td {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .w-10 {
        width: 10%;
    }

    .w-65 {
        width: 65%;
    }

    .fm-content-item {
        cursor: pointer;
        max-width: 1px;
    }

    .text-hidden {
        color: #cdcdcd;
    }
}
</style>
