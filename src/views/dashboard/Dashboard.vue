<template>
    <app-screen class="animated fadeIn">
        <div class="container-fluid mt-3">
            <div class="row g-3">
                <div class="col-12 col-sm-6 col-md-3">
                    <version-info />
                </div>
            </div>
        </div>
        <!--<div class="container-fluid my-5">
            <b-row class="justify-content-center">
                <b-col cols="6">
                    <b-jumbotron bg-variant="secondary" text-variant="white" border-variant="light">
                        <template v-slot:header>Welcome to ExologCMS</template>
                        <template v-slot:lead>
                            full control of your own website!
                        </template>
                    </b-jumbotron>
                </b-col>
            </b-row>
        </div>-->
    </app-screen>
</template>

<script>
import VersionInfo from '@/views/dashboard/widgets/VersionInfo'

export default {
    name: 'Dashboard',
    components: {VersionInfo},
}
</script>

<style>

</style>
