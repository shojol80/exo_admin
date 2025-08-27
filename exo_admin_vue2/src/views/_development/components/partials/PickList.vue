<template>
    <app-screen class="animated fadeIn">
        <div class="container-fluid mt-3">
            <b-card>
                <PickList v-model="source" :selection.sync="value" :metaKeySelection="true">
                    <template #item="slotProps">
                        <div class="p-caritem">
                            {{slotProps.item}}
                        </div>
                    </template>
                </PickList>

                <p>
                    <code>
                        {{source[1]}}
                    </code><code>
                        {{source[0]}}
                    </code>
                </p>
            </b-card>
        </div>
    </app-screen>
</template>

<script>

    import AppScreen from '@/components/containers/AppScreen'
    import PickList from 'primevue/picklist';

    export default {
        components: {
            AppScreen,
            PickList
        },
        data() {
            return {
                source: [
                    [1,
                        2,
                        3,
                        4],
                    []
                ],
            }
        }
    }
</script>

<style lang="scss">
    .component__container .main {
        margin-left: 0 !important;
    }

    .component {
        align-items: flex-start;

        .real-component {
            height: auto !important;
        }
    }
</style>
