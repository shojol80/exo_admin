<template>
    <div class="layout-setup mt-3">
        <div class="grid-template">
            <template v-if="template_name">
                <template-slot v-for="slot in template"
                               :key="'_'+template_name+'_'+slot.name"
                               :slot-data="slot"
                />
            </template>
            <template v-else>
                <div class="layout-empty-template">
                    <p>Please select {{ whatNeedSelect }}
                    </p>
                </div>
            </template>

        </div>
        <blocks-list></blocks-list>
    </div>
</template>

<script>

import TemplateSlot from "./TemplateSlot";
import BlocksList from "./BlocksList";

export default {
    name: 'LayoutSetup',
    components: {
        BlocksList,
        TemplateSlot,
    },
    props: {},
    data() {
        return {}
    },
    computed: {
        template() {
            return this.$store.getters["rl/getTemplate"]
        },
        template_name() {
            return this.$store.getters['rl/getTemplateName']
        },
        scope() {
            return this.$store.getters['rl/getScope']
        },
        whatNeedSelect() {
            return (!this.template_name ? 'layout template' : '')
                +
                (!this.template_name && !this.scope ? ' and ' : '')
                +
                (!this.scope ? ' scope' : '');


        }
    },
    methods: {}
}
</script>

<style lang="scss">
@import "@/assets/scss/vue-component";

.layout-setup {
    display: flex;
    gap: 30px;
    position: relative;

    .grid-template {
        border: 1px solid $slot-border-color;
        background-color: $white;
        box-shadow: 1px 1px 9px 2px #ccc;
        flex: 1 1 auto;
        min-height: calc(100vh - #{$app-header-height} - #{$action-toolbar-height} - #{$rm-px-1 * 2});
        display: grid;
        gap: 10px;
        padding: 10px;
        grid-auto-rows: minmax(auto, auto);
        grid-auto-columns: 1fr;
    }

    .blocks-list {
        min-width: 30%;
        max-width: 600px;
    }

    .layout-empty-template {
        background-color: $body-bg;
        color: $gray-400;
        font-size: 1.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

</style>
