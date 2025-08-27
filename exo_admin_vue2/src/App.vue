<template>
    <div>
        <vue-progress-bar></vue-progress-bar>
        <router-view></router-view>
        <container-dialog></container-dialog>
        <svg-sprite/>
    </div>
</template>

<script>
import exoEventBus from "@modules/exoEventBus"
import isEmpty from '@modules/isEmpty'

export default {
    name: 'app',
    watch: {
        '$route.query.screenMode'(mode) {
            if (!isEmpty(mode)) {
                this.$store.dispatch('app/screenMode', {mode})
            }
        }
    },
    created() {
        if (window !== window.parent) {
            this.$store.dispatch('app/screenMode', {mode: 'POPUP'})
        }
    },
    mounted() {
        exoEventBus.$on('exo-router-replace', (payload) => {
            this.$router.replace(payload)
        })

        exoEventBus.$on('exo-router-push', (payload) => {
            this.$router.push(payload)
        })

        exoEventBus.$emit('exo-bridge-installed')
    }
}
</script>

<style lang="scss">

/* Import Vendors styles*/
@import '~bootstrap-vue/dist/bootstrap-vue.css';
@import '~vue-awesome-notifications/dist/styles/style.scss';
/*Import application styles*/
@import 'assets/scss/style';

</style>
