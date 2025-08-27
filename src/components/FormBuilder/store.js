import Vue from 'vue'
import flattenTree from "@/shared/flattenTree";

const store = Vue.observable({
    form: {
        form_questions_tree: []
    },
    container: null
});

function getUniqueName(fq_name, n = 0) {
    const arr = flattenTree(store.form.form_questions_tree, 'form_questions_tree')
    if (arr.some(fq => {
        return fq.fq_name === fq_name + (n === 0 ? '' : '_' + n)
    })) {
        return getUniqueName(fq_name, n + 1)
    } else {
        return fq_name + (n === 0 ? '' : '_' + n)
    }
}

store.getUniqueName = getUniqueName


export default store
