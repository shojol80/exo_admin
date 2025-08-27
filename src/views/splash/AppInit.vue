<template>
    <app-screen>
        <div class="p-2">
            loading...
        </div>
    </app-screen>
</template>

<script>
import {R_DASHBOARD} from '@modules/routs'

export default {
    name: "AppInit",
    computed: {
        loaded() {
            return this.$store.getters['app/initComplite']
        }
    },
    watch: {
        loaded: {
            immediate: true,
            handler(loaded) {
                if (loaded) {
                    if (this.$route.params.redir) {
                        this.$router.replace(this.$route.params.redir)
                    } else {
                        this.$router.replace({name: R_DASHBOARD})
                    }
                }
            }
        }
    },
    mounted() {
        this.$store.dispatch('app/initApp')
    }
}
</script>

<style scoped>

</style>
