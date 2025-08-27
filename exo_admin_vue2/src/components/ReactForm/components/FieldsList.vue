<template>
    <div class="field-list">
        <template v-for="(item, index) in fields">
            <fe-form-group :key="index">
                <component :is="item.component"
                           :fq="item"
                           @change="changeValue">
                </component>
            </fe-form-group>
        </template>
    </div>
</template>

<script>
import feFormGroup from "@/components/ReactForm/components/feFormGroup.vue";
import _ from "lodash";

export default {
    name: 'FieldsList',
    components: {
        feFormGroup,
        feInput: () => import('./fields/feInput'),
        feCheckbox: () => import('./fields/feCheckbox'),
        feSelect: () => import('./fields/feSelect'),
        feTextarea: () => import('./fields/feTextarea'),
        feDate: () => import('./fields/feDate'),
        feRadio: () => import('./fields/feRadio'),
        feFile: () => import('./fields/feFile'),
        feHidden: () => import('./fields/feHidden'),
        feHtml: () => import('./fields/feHtml'),
        fePlainText: () => import('./fields/fePlainText'),
        fePicture: () => import('./fields/fePicture'),
        feContainer: () => import('./fields/feContainer'),
        feView: () => import('./fields/feView'),
        feUnit: () => import('./fields/feUnit'),
        feMailable: () => import('./fields/feMailable'),
        feSection: () => import('./fields/feSection'),
        fePermalink: () => import('./fields/fePermalink'),
        feJson: () => import('./fields/feJson'),
    },
    props: {
        fq_parent_id: {}
    },
    computed: {
        fqt() {
            return this.$store.getters['ECO/fqtArray']
        },
        fields() {
            return this.$store.getters['reactForm/fields'].filter(item => {
                if (item.fq_parent_id !== this.fq_parent_id) return false
                const fqt = this.$store.getters['ECO/getFqtById'](item.fqt_id)
                //hidden in ECO
                if (fqt['front'] && fqt['front']['reactForm'] && fqt['front']['reactForm']['hidden'] === true) {
                    return false
                }
                return (item.isvisible === 1 || this.$store.state.reactForm.showAllFields)
            }).map(item => {
                item.component = this.getComponent(item.fqt_id)
                return item
            })
        },
    },
    methods: {
        getComponent(fqt_id) {
            const fqt = this.$store.getters['ECO/getFqtById'](fqt_id)
            return _.get(fqt, 'front.reactForm.component', 'feInput')
        },
        changeValue({fq_id, value}) {
            this.$store.commit('reactForm/setQuestionValue', {fq_id, value})
        },
    }
}
</script>

<style lang="scss">
.field-list {
    .fe-form-group:last-child {
        margin-bottom: 0;
    }
}
</style>
