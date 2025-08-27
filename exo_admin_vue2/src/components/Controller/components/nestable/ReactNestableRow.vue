<template>
    <div class="react-nestable-row" @mouseleave="closeActionMenu">
        <div class="react-nestable-row__column react_title" :class="reactTitleClasses">{{ react.react_title }}</div>
        <div class="react-nestable-row__column react_edition_id" title="edition id">
            {{ react.react_edition_id }}
        </div>
        <div class="react-nestable-row__column form-actions">
            <icon v-if="isRedirReact" :icon="$icons.redirect"></icon>
            <icon v-else-if="isMailReact" :icon="$icons.mail"></icon>
        </div>
        <div class="react-nestable-row__column react_publish">
            <template v-if="+(react.react_publish)!==-1">
                <x-switch size="sm" :value="react.react_publish"
                          @change="onPublishChange(react, $event)">
                </x-switch>
            </template>
        </div>
        <div class="react-nestable-row__column react_id" title="react id">{{ react.react_id }}</div>
        <div class="react-nestable-row__column react_form_name" title="form name">{{ react.react_form_name }}</div>
        <div class="react-nestable-row__column react_date_changed">{{ react.react_date_changed }}</div>
        <div class="react-nestable-row__column actions">
            <action-group>
                <action-button @action="removeItem"
                               title="Delete item"
                               :icon="$icons.group_remove">
                </action-button>
                <action-button @action="reactEditContainer"
                               title="Edit"
                               :icon="$icons.edit">
                </action-button>
                <action-button
                    :disabled="!react.hasOwnProperty('permalink')"
                    @action="reactBrowseExt(react)"
                    title="Browse"
                    :icon="$icons.external_link">
                </action-button>
                <action-button
                    v-if="isActionContainer"
                    @action="reactAction"
                    title="Actions"
                    :icon="$icons.rules">
                </action-button>
                <action-dropdown :icon="$icons.more" ref="actionMenu">
                    <template #dropdown>
                        <!--                        <action-dropdown-item
                                                    @click="reactClone([react])"
                                                    :icon="$icons.clone">Clone
                                                </action-dropdown-item>-->
                        <action-dropdown-item
                            @click="copyItem()"
                            :icon="$icons.clone">Duplicate an item
                        </action-dropdown-item>
                        <action-dropdown-item
                            @click="reactDelete([react])"
                            :icon="$icons.delete">Delete react completely
                        </action-dropdown-item>
                    </template>
                </action-dropdown>
            </action-group>
        </div>
    </div>
</template>

<script>
import reactActions from '@/mixins/reactActions/reactActions'
import {R_CONTROLLER_ACTIONS, R_CONTROLLER_EDIT_ITEM} from '@/router/routs'
import reacts from "@/services/api/reacts";

export default {
    name: 'ReactNestableRow',
    mixins: [reactActions],
    props: {
        item: Object,
    },
    computed: {
        reactTitleClasses() {
            return {
                'unpublished': +(this.react.react_publish) === 0
            }
        },
        react() {
            return this.item.react
        },
        container() {
            return this.$store.getters['controller/container']
        },
        holderId() {
            return this.$store.getters['controller/getHolderId']
        },
        isActionContainer() {
            return this.$store.getters['controller/isActionContainer']
        },
        isRedirReact() {
            return this.isActionContainer && this.react.react_rule_use_for_redir
        },
        isMailReact() {
            return this.isActionContainer && this.$store.getters['forms/isMailable'](this.react.react_form)
        }
    },

    methods: {
        reactEditContainer() {
            this.$router.push({
                name: R_CONTROLLER_EDIT_ITEM,
                params: {
                    react_id: this.react.react_id,
                },
            })
        },

        closeActionMenu() {
            this.$refs.actionMenu.hide();
        },
        removeItem() {
            this.$store.dispatch('controller/removeItem', {item: this.item})
        },
        copyItem() {
            this.$store.dispatch('controller/copyItem', {item: this.item})
        },
        reactAction() {
            this.$router.push({name: R_CONTROLLER_ACTIONS, params: {react_id: this.react.react_id}})
        },
        async load() {
            await this.$store.dispatch('controller/loadItems')
        },
        async onPublishChange(react, value) {
            await reacts.saveReactFieldValue({
                react_id: react.react_id,
                name: 'publish',
                value
            })
            await this.load()
        },
        async reactBrowseExt(react) {
            await this.reactBrowse([react], {
                container: this.container,
                resolve_holder_form: this.isMailReact && this.container
            })
        },
    }
}
</script>

<style scoped lang="scss">

@import "src/assets/scss/vue-component";

.react-nestable-row {
    display: grid;
    grid-template-columns: 1fr 70px 50px 80px 100px 180px 200px;

    &__column {
        padding: 10px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        color: $exo-text-secondary;

        &.react_title:not(.unpublished) {
            //max-width: 700px;
            //min-width: 300px;
            color: $exo-text-primary;
        }

        &.form-actions,
        &.react_publish {
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
        }

        &.react_form_name {
        }

        &.react_date_changed {
        }

        &.react_id {
        }


        &.actions {
            display: none;
            top: 0;
            right: 1px;
            height: 100%;
            position: absolute;
            background-color: $exo-bg;
            box-shadow: -30px 0 10px -6px $exo-bg;
            overflow: visible;
        }
    }

    &:hover {
        .react-nestable-row__column.actions {
            display: flex;
        }
    }
}
</style>
