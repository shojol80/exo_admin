<template>
    <collapse-section class="fe-json">
        <template #legend="{visible}">
            <span class="mr-2">{{ fq.label }}</span>
            <collapse-section-sub-title>
                <template v-if="!visible">
                    <p>{{ value }}</p>
                </template>
                <template v-else>
                    <field-info-icon :fq="fq"></field-info-icon>
                </template>
            </collapse-section-sub-title>
        </template>
        <ValidationProvider
            slim
            :name="fq.label" :rules="ruleObject" v-slot="{ errors, valid }">
            <json-editor v-model="value"></json-editor>
            <invalid-feedback :id="id" :errors="inputErrors(errors)"></invalid-feedback>
        </ValidationProvider>
    </collapse-section>
</template>

<script>

import FieldInfoIcon from '@/components/ReactForm/components/FieldInfoIcon'
import jsonValue from '@/components/ReactForm/components/fields/mixins/jsonValue'
import validation from '@/components/ReactForm/components/fields/mixins/validation'
import common from '@/components/ReactForm/components/fields/mixins/common'
import feBaseControl from '@/components/ReactForm/components/feBaseControl'
import JsonEditor from '@modules/vue-json-editor'
import CollapseSectionSubTitle from "@/components/ReactForm/components/CollapseSectionSubTitle.vue";
import BtnSetReactAsHome from "@/components/ReactForm/components/BtnSetReactAsHome.vue";
import SelectReactFormPermalink from "@/components/ReactForm/components/SelectReactFormPermalink.vue";
import PermalinksTable from "@/components/ReactForm/components/PermalinksTable.vue";
import CollapseSection from "@/components/ReactForm/components/CollapseSection.vue";


export default {
    name: "feJson",
    components: {
        CollapseSection,
        PermalinksTable,
        SelectReactFormPermalink,
        BtnSetReactAsHome,
        CollapseSectionSubTitle,
        FieldInfoIcon, feBaseControl, JsonEditor
    },
    mixins: [jsonValue, validation, common],
    computed: {
        react_id() {
            return this.$store.getters['reactForm/react_id']
        }
    },
    methods: {
        empty() {
            return null
        },
        normalizeValue(value) {
            return value
        },

    }

}
</script>

<style lang="scss">
@import "src/assets/scss/vue-component";

.fe-json {
    position: relative;

    .collapse-section__body {
        padding: 1rem;
        background-color: $white;
    }
    .collapse-section-sub-title {
        p {
            margin-bottom: 0;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            max-width: 600px;
        }
    }
}

</style>
