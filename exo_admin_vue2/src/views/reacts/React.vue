<template>
    <app-screen>
        <react-form
            ref="form"
            :react_id="react_id === 'new' ? null : react_id"
            :form_id="form_id"
            :container="container"
            :react_edition_id="react_edition_id"
            @save="onSave">
            <template v-slot:actionBefore>
                <action-back></action-back>
            </template>
            <template v-slot:actionAfter>
            </template>
        </react-form>
    </app-screen>
</template>

<script>
import ReactForm from '@/components/ReactForm'
import authorization from '@/mixins/authorization'


export default {
    name: "React",
    mixins: [authorization],
    components: {ReactForm},
    props: {
        react_id: {
            type: [String, Number],
            required: true,
        },
        container: {
            type: String,
            required: false,
        }
    },
    computed: {
        form_id() {
            return this.$route.query.form_id ? this.$route.query.form_id : ''
        },
        react_edition_id() {
            return this.$route.query.react_edition_id ? this.$route.query.react_edition_id : ''
        }
    },
    mounted() {
        // this.$store.dispatch('breadcrumb/updateLast', {label: `Edit reaction: ${this.react_id}`})
    },
    methods: {
        onSave(react_id) {
            this.$router.push({name: this.$route.name, params: {react_id}})
        },
    }
}
</script>
