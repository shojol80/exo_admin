<template>
    <fragment>
        <action-group>
            <action-button @action="load">LOAD</action-button>
            <action-button @action="save">SAVE</action-button>
        </action-group>
        <x-form-routes
            ref="fr"
            :form_id="884"
            v-model="selected">
        </x-form-routes>
    </fragment>

</template>

<script>
export default {
    name: 'CmpXFormRoutes',
    data() {
        return {
            selected: null
        }
    },
    mounted() {
        this.load();
    },
    methods: {
        save() {
            this.$refs.fr.save();
        },
        load(){
            this.$refs.fr.load();
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/vue-component";

</style>
