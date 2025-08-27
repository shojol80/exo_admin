<template>
    <div class="fb-container">
        <div class="fb-question-container"
             :class="{'fb-question-container--empty':isEmpty}">
            <visibility-header></visibility-header>
            <FqDndContainer
                v-model="form.form_questions_tree">
            </FqDndContainer>
        </div>
        <screen-scroll-container :height-option="2" class="fb-fqt-container">
            <div>
                <list-preset-fields
                    :form_questions="form.form_questions_tree"
                    class="mb-3">
                </list-preset-fields>
                <list-fields></list-fields>
            </div>
        </screen-scroll-container>
    </div>
</template>

<script>

import VisibilityHeader from './components/VisibilityHeader'
import ListPresetFields from './components/ListPresetFields'
import ListFields from './components/ListFields'
import FqDndContainer from './components/FqDndContainer.vue'
import store from "./store";

export default {
    name: "FormBuilder",
    components: {
        FqDndContainer,
        ListFields,
        VisibilityHeader,
        ListPresetFields
    },
    model: {
        prop: 'form',
        event: 'change'
    },
    props: {
        form: {
            required: true,
            type: Object,
        },
        container: {
            required: false,
            type: String,
        },
    },
    computed: {
        isEmpty() {
            return !this.form.form_questions_tree || this.form.form_questions_tree.length === 0
        },
        store() {
            return store
        }
    },
    watch: {
        form: {
            immediate: true,
            handler(form) {
                store.form = form
            }
        },
        container: {
            immediate: true,
            handler(container) {
                store.container = container
            }
        }
    }
}
</script>

<style lang="scss">

@import "src/assets/scss/vue-component";

.fb-container {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}


.fb-question-container {
    flex: 1 0 auto;
    margin-right: 1rem;
    min-height: calc(100vh - #{$app-header-height} - #{$action-toolbar-height} - #{$tab-toolbar-height} - #{$rm-px-1});
    max-width: 900px;



    .list-group {
        width: 100%;
    }

    &--empty {

    }
}

.fb-fqt-container {
    min-width: 250px;
}
</style>
