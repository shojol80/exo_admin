<template>
    <action-group>
        <action-button v-bind="$attrs"
                       v-on="$listeners"
                       :icon="$icons.edit"
                       title="Edit view"
                       @action.prevent="showAside=true">
            <slot>Edit view</slot>
        </action-button>
        <aside-panel v-model="showAside"
                     :hide-action-toolbar="true"
                     @after-enter="refreshEditor">
            <pick-view
                ref="pick"
                :view="view"
                :path="path"
                @select="onSelect"
            ></pick-view>
        </aside-panel>
    </action-group>
</template>

<script>
import AsidePanel from '@/components/containers/components/AsidePanel'
import PickView from '@/components/statefull/PickView'

export default {
    name: 'ActionEditView',
    components: {PickView, AsidePanel},
    model: {
        prop: 'view',
        event: 'change'
    },
    props: {
        view: {type: String},
        path: {type: String}
    },
    data() {
        return {showAside: false}
    },
    computed: {},

    methods: {
        async onSelect(value) {
            this.showAside = false
            this.$emit('change', value);
        },
        refreshEditor() {
            this.$refs.pick.refresh()
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/vue-component";

</style>
