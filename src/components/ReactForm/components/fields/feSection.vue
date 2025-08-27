<template>
    <collapse-section class="fe-section">
        <template #legend="{visible}">
            <span class="mr-2">{{ fq.label }}</span>
            <collapse-section-sub-title class="fe-section__children-title">
                <template v-if="!visible">
                    {{ children.join(', ') }}
                </template>
                <template v-else>
                    <field-info-icon :fq="fq"></field-info-icon>
                </template>
            </collapse-section-sub-title>
        </template>
        <fields-list :fq_parent_id="fq.fq_id"></fields-list>
    </collapse-section>
</template>

<script>

import inputs from './mixins/inputs'
import FieldsList from "@/components/ReactForm/components/FieldsList.vue";
import CollapseSection from "@/components/ReactForm/components/CollapseSection.vue";
import CollapseSectionSubTitle from "@/components/ReactForm/components/CollapseSectionSubTitle.vue";
import FieldInfoIcon from "@/components/ReactForm/components/FieldInfoIcon.vue";

export default {
    name: "feSection",
    components: {FieldInfoIcon, CollapseSectionSubTitle, CollapseSection, FieldsList},
    mixins: [inputs],
    computed: {
        children() {
            return this.$store.getters['reactForm/fields'].filter(item => {
                if (item.fq_parent_id !== this.fq.fq_id) return false
                const fqt = this.$store.getters['ECO/getFqtById'](item.fqt_id)
                //hidden in ECO
                if (fqt['front'] && fqt['front']['reactForm'] && fqt['front']['reactForm']['hidden'] === true) {
                    return false
                }
                return (item.isvisible === 1 || this.$store.state.reactForm.showAllFields)
            }).map(item => {
                return item.label
            })

        }
    }

}
</script>

<style lang="scss">
@import "@/assets/scss/vue-component";

.fe-section {
    .field-list {
        border-top: 1px solid $input-border-color;
        padding: 1rem;
    }
}

</style>
