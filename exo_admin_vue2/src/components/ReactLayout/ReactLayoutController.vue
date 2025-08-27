<template>
    <div class="grid-controller">
        <waiter ref="waiter" :show="$store.state.rl.busy">
            <action-toolbar>
                <action-group>
                    <action-back></action-back>
                    <select-layout-template></select-layout-template>
                </action-group>
                <action-group right>
                    <select-scope/>
                </action-group>
            </action-toolbar>
            <layout-setup></layout-setup>
        </waiter>
    </div>
</template>

<script>

import SelectLayoutTemplate from "./components/SelectLayoutTemplate";
import SelectScope from "./components/SelectScope";
import LayoutSetup from "./components/LayoutSetup";

export default {
    name: 'ReactLayoutController',
    components: {SelectScope, LayoutSetup, SelectLayoutTemplate},
    props: {
        layout: {
            type: String,
            required: true
        }
    },
    mounted() {
        this.load()
    },
    methods: {
        load() {
            this.$store.dispatch('rl/init', {layout: this.layout})
        },
    }
}
</script>

