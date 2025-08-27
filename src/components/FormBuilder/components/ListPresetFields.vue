<template>
    <list-base title="Predefined fields" :items="preset_fq" :key-name="'name'">
        <template #default="{item}">
            <icon :icon="item.icon" class="mr-1"></icon>
            {{ item.name }}
        </template>
    </list-base>
</template>

<script>
import ListBase from './ListBase'
import flattenTree from "@/shared/flattenTree";

export default {
    name: "ListPresetFields",
    components: {
        ListBase
    },
    props: {
        form_questions: {type: Array}
    },
    computed: {
        form_questions_flat() {
            return flattenTree(this.form_questions, 'form_questions_tree')
        },
        preset_fq() {
            let preset_fq = Object.values(this.ECO.forms.preset_fq)
            return preset_fq.filter(item => {
                return !this.form_questions_flat.some(element => element.fq_name === item.fq.fq_name)
            })
        },
    },

}
</script>

<style scoped lang="scss">

</style>
