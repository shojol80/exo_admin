<template>
    <fqt-base
        class="fqt-section"
        :fq="fq"
        :active="sectionActive"
        @collapse="sectionActive=!sectionActive"
        v-bind="$attrs"
        v-on="$listeners">
        <template #type><span></span></template>
        <template #rules><span></span></template>
        <template #required><span></span></template>
        <template #customParam><span></span></template>
        <template>
            <div class="fqt-section__holder">
                <fq-dnd-container
                    v-model="form_questions">
                </fq-dnd-container>
            </div>
        </template>
    </fqt-base>
</template>

<script>

import FqtBase from "@/components/FormBuilder/components/fqt/fqtBase.vue";

export default {
    name: "fqtSection",
    components: {
        FqtBase,
        FqDndContainer: () => import('../FqDndContainer.vue')
    },
    model: {
        prop: 'fq',
        event: 'change'
    },
    props: {
        fq: {},
    },
    data() {
        return {
            sectionActive: false
        }
    },
    computed: {
        form_questions: {
            get() {
                return this.fq.form_questions_tree || []
            },
            set(value) {
                this.fq.form_questions_tree = value
            }
        }
    },
    methods: {}
}
</script>

<style lang="scss">
.fqt-section {
    //background-color: #eeeeee;

    .list-group-item {
        border-color: #bebebe;
    }

    &__holder {
        /*padding-left: 1rem;
        padding-bottom: 1rem;
        padding-right: 1rem*/
    }
}
</style>
