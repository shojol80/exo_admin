<template>
    <div class="splash-bg center-position setup-2fa">
        <div class="container">
            <b-row class="justify-content-center">
                <b-col md="6">
                    <two-step-auth @done="onDone"></two-step-auth>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>

import {R_DASHBOARD} from '@/router/routs'
import TwoStepAuth from '@/components/statefull/TwoStepAuth'

export default {
    name: 'Setup2fa',
    components:{TwoStepAuth},
    methods: {
        onDone() {
            this.$router.push({name: R_DASHBOARD})
        }
    }
}
</script>

<style lang="scss">

</style>
