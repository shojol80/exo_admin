<template>
    <fragment>
        <div class="controller" v-show="isParentView">
            <waiter ref="waiter">
                <action-toolbar>
                    <action-group>
                        <slot name="actionBefore"></slot>
                        <action-dropdown :icon="$icons.add" title="Add items" :disabled="forms.length===0">
                            <template #dropdown>
                                <b-dropdown-item @click="addNewItem">Add new item</b-dropdown-item>
                                <b-dropdown-item @click="addItems">Select existing item</b-dropdown-item>
                            </template>
                        </action-dropdown>
                        <action-button title="Reload"
                                       :icon="$icons.reload"
                                       @action="reload">
                        </action-button>
                        <action-button title="Setup container"
                                       :icon="$icons.setup"
                                       @action="setup">
                        </action-button>
                        <action-group-separator/>
                        <action-dropdown :icon="$icons.sort" title="Sort items">
                            <template #dropdown>
                                <b-dropdown-item @click="sort('react_title','asc')">By name, A->Z
                                </b-dropdown-item>
                                <b-dropdown-item @click="sort('react_title','desc')">By name, Z->Z
                                </b-dropdown-item>
                                <b-dropdown-item @click="sort('react_date_changed','asc')">By last modify day, 0->9
                                </b-dropdown-item>
                                <b-dropdown-item @click="sort('react_date_changed','desc')">By last modify day, 9->0
                                </b-dropdown-item>
                            </template>
                        </action-dropdown>
                        <action-button title="Collapse/Expand"
                                       :icon="$icons.collapse"
                                       @action="collapsed=!collapsed">
                        </action-button>
                        <action-group-separator/>
                        <action-form-setup/>
                        <action-form-related-reacts/>
                        <action-open-holder/>
                    </action-group>
                </action-toolbar>
                <react-nestable
                    :key-prop="'$int_id'"
                    :collapsed-items="collapsed"
                    :reacts="itemsTree"
                    :max-depth="maxDepth"
                    @change="save">
                </react-nestable>
            </waiter>
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <breadcrumb-portal :disabled="!isParentView">
            <info-icon>
                <table>
                    <tr>
                        <th>container:</th>
                        <td>{{ container }}</td>
                    </tr>
                </table>
            </info-icon>
        </breadcrumb-portal>
    </fragment>
</template>

<script>
import ReactNestable from './components/nestable/ReactNestable'
import ActionFormSetup from './components/ActionFormSetup'
import ActionFormRelatedReacts from './components/ActionFormRelatedReacts'
import ActionOpenHolder from './components/ActionOpenHolder'
import {R_CONTROLLER, R_CONTROLLER_ADD_ITEMS, R_CONTROLLER_EDIT_ITEM, R_CONTROLLER_SETTINGS,} from '@/router/routs'
import isEmpty from '@modules/isEmpty'
import PromptNewReactDialog from '@/components/dialogs/PromptNewReactDialog'

export default {
    name: "Controller",
    components: {
        ActionFormRelatedReacts,
        ActionFormSetup,
        ActionOpenHolder,
        ReactNestable,
    },
    props: {
        container: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            collapsed: true,
        }
    },
    computed: {
        itemsTree() {
            return this.$store.getters['controller/itemsTree']
        },
        isParentView() {
            return this.$route.name === R_CONTROLLER
        },
        maxDepth() {
            return +this.$store.getters['controller/settings/config'].maxDepth
        },

        forms() {
            let forms = this.$store.getters['controller/settings/getForms']
            if (isEmpty(forms)) return []
            else return forms.map(form => {
                return {form_id: form.form_id}
            })
        },

        containerName() {
            return this.$store.getters['controller/settings/config'].name
        }
    },
    watch: {
        container() {
            this.load()
        },
        containerName() {
            this.updateBC()
        },
        $route() {
            this.updateBC()
        }
    },
    mounted() {
        this.load()
    },
    methods: {
        updateBC() {
            if (!this.isParentView) return
            this.$store.dispatch('breadcrumb/updateLast', {label: `${this.$route.meta.label} "${this.containerName}"`})

        },
        load() {
            this.$refs.waiter.wait(
                this.$store.dispatch('controller/loadContainer', {
                    container: this.container,
                })
            )
        },
        addItems() {
            this.$router.push({name: R_CONTROLLER_ADD_ITEMS})
        },
        async addNewItem() {
            let event = await this.$dialogs.show(PromptNewReactDialog, {
                forms: this.forms,
                defaults: {
                    form_id: this.forms[0].form_id
                }
            })
            if (event.trigger !== 'ok' || !event.value) return
            await this.$router.push({
                name: R_CONTROLLER_EDIT_ITEM,
                params: {react_id: 'new'},
                query: event.value
            })

        },
        save(item, state) {
            this.$store.commit('controller/setItemsTree', state.items)
            this.$store.dispatch('controller/saveItems')
        },
        reload() {
            this.load()
        },
        setup() {
            this.$router.push({name: R_CONTROLLER_SETTINGS})
        },
        sort(key, dir) {
            this.$store.dispatch('controller/sortItems', {key, dir})
        },
    }

}
</script>

<style scoped>

</style>
