<template>
    <app-screen class="animated fadeIn">
        <b-card class="mt-3" header="Controller">
            <b-button @click="goForm" class="mr-1">form container</b-button>
            <b-button @click="goReact" class="mr-1">react container</b-button>
            <b-button @click="goReactExedit" class="mr-1">exedit-container</b-button>
        </b-card>
        <b-card class="mt-3" header="Templates">
            <b-button @click="goSelectTemplate" class="mr-1">Select Template</b-button>
        </b-card>
        <b-card class="mt-3" header="Search">
            <b-button @click="goSearch" class="mr-1">Search react</b-button>
        </b-card>
        <b-card class="mt-3" header="TinyMCE plugins">
            <b-button @click="goBtnSettings" class="mr-1">BtnSettings</b-button>
        </b-card>
        <b-card class="mt-3" header="Route">
            <x-form-text-area rows="20" title="query" v-model="routeOne"></x-form-text-area>
            <b-button @click="goRouteOne" class="mr-1">ROUTE</b-button>
        </b-card>
        <b-card class="mt-3" header="Route">
            <x-form-input title="name" v-model="route.name"></x-form-input>
            <x-form-text-area title="params" v-model="route.params"></x-form-text-area>
            <x-form-text-area title="query" v-model="route.query"></x-form-text-area>
            <b-button @click="goRoute" class="mr-1">ROUTE</b-button>
        </b-card>
    </app-screen>
</template>

<script>

import {R_BTNSETTINGS, R_CONTROLLER, R_REACTS_TABLE, R_SEARCH_CONTROLLER} from '@modules/routs'
import JSON5 from 'json5'

export default {

    data() {
        return {
            route: {
                name: R_REACTS_TABLE,
                params: '{}',
                query: '{forms:[751,755]}'
            },
            routeOne: '{\n' +
                '                name: R_REACTS_TABLE,\n' +
                '                params: \'{}\',\n' +
                '                query: \'{forms:[751,755]}\'\n' +
                '            }'
        }
    },
    methods: {
        goForm() {
            this.$router.push({
                name: R_CONTROLLER,
                params: {
                    container: 'holderType:var|holderId:43154|var_name:container_response|var_type:form|var_parent:895',
                    extraParams: JSON.stringify({maxDepth: 1})
                },
            })
        },
        goReact() {
            this.$router.push({
                name: R_CONTROLLER,
                params: {
                    container: "884|731509|related_forms|related_table",
                    extraParams: JSON.stringify({maxDepth: 10, checktables: true})
                }
            })
        },
        goReactExedit() {
            this.$router.push({
                name: R_CONTROLLER,
                params: {
                    container: 'holderType:react|holderId:731567|fq_name:blocks',
                    //extraParams: ''//JSON.stringify({maxDepth: 5})
                },
            })
        },
        goSearch() {
            this.$router.push({
                name: R_SEARCH_CONTROLLER,
                params: {react_id: 869284},
            })
        },
        goBtnSettings() {
            this.$router.push({
                name: R_BTNSETTINGS,
                query: {
                    id: 'mce_0',
                    field: 'menu_title',
                    optionId: 'form_884'
                },
            })
        },
        goRoute() {
            this.$router.push({
                name: this.route.name,
                params: JSON5.parse(this.route.params),
                query: JSON5.parse(this.route.query),
            })
        },
        goRouteOne() {
            this.$router.push(JSON5.parse(this.routeOne))
        }

    }
}
</script>

<style lang="scss">

</style>
