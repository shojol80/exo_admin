<template>
    <select-form-permalink
        :form_id="form.form_id"
        v-model="react_form_permalink_id"
        placeholder="Use permalink from form properties">
    </select-form-permalink>
</template>
<script>
import isEmpty from "@modules/isEmpty";

export default {
    name: 'select-react-form-permalink',
    computed: {
        formconf() {
            return this.$store.getters['reactForm/formconf']
        },
        form() {
            return this.$store.getters['forms/getForm'](this.formconf.form_id)
        },
        react_form_permalink_id: {
            get() {
                let id = +this.$store.getters['reactForm/react_form_permalink_id']
                return (isEmpty(id) || id === 0) ? undefined : id;
            },
            set(value) {
                return this.$store.commit('reactForm/set_react_form_permalink_id', value)
            }
        },
        /*form_form_permalink() {
            return this.form.form_permalink_id
        }*/
    }
}
</script>
