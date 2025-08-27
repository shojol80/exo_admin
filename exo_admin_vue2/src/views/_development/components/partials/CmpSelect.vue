<template>

    <b-row>
        <b-col cols="6">
            <c-card header="XSelect">
                <x-select :options="options" v-model="value"></x-select>
                <p class="mt-2">
                    <code>value:{{ value }}</code>
                </p>
                <hr>
                <p><i>multiple="true"</i></p>
               <!-- -->
                <x-select :options="options"
                          :multiple="true"
                          v-model="value2"
                          :always-open="true"
                ></x-select>
                <p class="mt-2">
                    <code>value:{{ value2 }}</code>
                </p>
            </c-card>
        </b-col><!--/.col-->

        <b-col cols="6">
            <c-card header="SelectUsergroup">
                <select-usergroup></select-usergroup>
            </c-card>
        </b-col>
    </b-row>
</template>

<script>

import CCard from '../CCard'

export default {
    components: {
        CCard
    },
    data() {
        return {
            value: 1,
            value2: null,
            options: [
                {id: 1, label: 'One'},
                {
                    id: 2, label: 'Two', children: [
                        {id: 11, label: 'One'},
                        {id: 21, label: 'Two'},
                        {id: 31, label: 'Tree'}
                    ]
                },
                {id: 3, label: 'Tree'}],

            options2: [
                {value: null, text: 'Please select an option'},
                {value: 'a', text: 'This is First option'},
                {value: 'b', text: 'Selected Option'},
                {value: {C: '3PO'}, text: 'This is an option with object value'},
                {value: 'd', text: 'This one is disabled', disabled: true}
            ]
        }
    }
}
</script>

<style lang="scss">


</style>
