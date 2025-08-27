<template>
    <app-screen class="animated fadeIn">
        <b-row class="mt-3">
            <b-col sm="12" md="4">
                <execute-process :process-id="processId"/>
            </b-col>
        </b-row>
    </app-screen>
</template>

<script>

import ExecuteProcess from "@/components/ExecuteProcess/ExecuteProcess";

export default {
    name: 'Maintenance',
    props: ['processId'],
    components: {ExecuteProcess},
}
</script>

<style>

</style>
