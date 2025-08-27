<template>
    <action-group class="search-params-input">
        <action-button
            :icon="$icons.setup"
            @action.prevent="shwoAside=true">
            Search setup
        </action-button>
        <aside-panel v-model="shwoAside"
                     :hide-action-toolbar="true"
                     :hide-back-action="true">
                <search-params v-model="value">
                    <template slot="actionBefore">
                        <action-button
                            :icon="$icons.confirm"
                            @action.prevent="shwoAside=false">
                        </action-button>
                    </template>
                </search-params>
        </aside-panel>
    </action-group>
</template>
<script>

import SearchParams from '@/components/search/SearchParams'
export default {
    name: 'SearchParamsInput',
    components: {SearchParams},
    props: {
        value: {}
    },
    data() {
        return {
            shwoAside: false
        }
    },
}
</script>
