<template>
    <div class="search-query-input">
        <div class="mr-2 search-query-input__input">
            <b-form-input id="input-default" type="text" :disabled="selectedForms.length===0"
                          placeholder="Search in reactions content"
                          v-model="query"
                          @input="changeQueryScope">
            </b-form-input>
        </div>
        <div class="search-query-input__forms">
            <x-select
                value-format="object"
                :multiple="true"
                v-model="selectedForms"
                :options="availableForms"
                childrenKey="form_questions"
                :limit=4
                :append-to-body="true"
                placeholder="Select fields or forms">
            </x-select>
        </div>
    </div>
</template>

<script>
import {debounce} from 'lodash'
import availableForms from './mixins/availableForms'

export default {
    name: 'SearchQueryInput',
    mixins: [availableForms],
    props: {
        forms: {
            type: [Array, Boolean],
            default: true
        },
        queryScope: {
            type: Object,
        }
    },
    model: {
        prop: 'queryScope',
        event: 'change'
    },
    delay: {
        type: Number,
        default: 500
    },
    data() {
        return {
            query: this.queryScope ? this.queryScope.query : '',
            selectedForms: []
        }
    },
    computed: {
        storageKey: function () {
            return this.$store.state.site.site_id + '_' +
                this.$store.state.site.site_alias + '_search-react-questions'
        },
    },
    watch: {
        selectedForms: {
            deep: true,
            handler() {
                this.changeQueryScope()
            }
        },
        availableForms: {
            deep: true,
            immediate: true,
            handler() {
                if (this.availableForms.length > 0) {
                    this.selectedForms = [...this.availableForms]
                }
            }
        }
    },
    methods: {
        changeQueryScope: debounce(function (e) {
            let form_questions = this.selectedForms.map(item => {
                if (item.form_id) return item.form_questions
                return item
            })
            form_questions = form_questions.flat(1)

            this.$emit('change', {query: this.query, form_questions})
            //todo make delay param
        }, 500)
    }
}
</script>

<style lang="scss" scoped>
.search-query-input {
    display: flex;

    &__input {
        width: 250px;
    }

    &__forms {
        width: 550px;
    }
}
</style>
