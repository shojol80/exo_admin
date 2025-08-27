<template>
    <react-form
        ref="form"
        :react_id="react_id === 'new'?null :react_id"
        :form_id="form_id"
        :container="container"
        :react_edition_id="react_edition_id"
        @save="onSave">
        <template v-slot:actionBefore>
            <action-back :back-route="backRoute"></action-back>
        </template>
        <template v-slot:actionAfter>
            <action-group-separator/>
            <action-button :icon="$icons.prev"
                           :disabled="!prevItem"
                           title="Previous reaction in group"
                           @action="prev()">
            </action-button>
            <action-button :icon="$icons.next"
                           :disabled="!nextItem"
                           title="Next reaction in group"
                           @action="next()">
            </action-button>
        </template>
    </react-form>
</template>

<script>
import {R_CONTROLLER} from '@/router/routs'
import ReactForm from '@/components/ReactForm'
import isNumber from '@modules/isNumber'

export default {
    name: "ControllerEditItem",
    components: {ReactForm},
    props: {
        react_id: {
            required: true
        }
    },
    data() {
        return {
            backRoute: R_CONTROLLER
        }
    },
    computed: {
        container() {
            return this.$store.getters['controller/container']
        },
        form_id() {
            return this.$route.query.form_id ? this.$route.query.form_id : ''
        },
        react_edition_id() {
            return this.$route.query.react_edition_id ? this.$route.query.react_edition_id : ''
        },
        prevItem() {
            return this.$store.getters['controller/getPrevItem'](this.react_id)
        },
        nextItem() {
            return this.$store.getters['controller/getNextItem'](this.react_id)
        }

    },
    methods: {
        async onSave(react_id) {
            if (this.react_id === 'new' && isNumber(react_id)) {
                await this.$store.dispatch('controller/addItems', {items: [{id: react_id}], isNew: true})
                this.$router.replace({name: this.$route.name, params: {react_id}})
            } else {
                await this.$store.dispatch('controller/loadItems')
            }
        },
        prev() {
            if (this.prevItem) {
                this.$router.replace({name: this.$route.name, params: {react_id: this.prevItem.id}})
            }
        },
        next() {
            if (this.nextItem) {
                this.$router.replace({name: this.$route.name, params: {react_id: this.nextItem.id}})
            }
        },

    },
}
</script>

<style scoped>

</style>
