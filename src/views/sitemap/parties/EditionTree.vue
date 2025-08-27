<template>
    <x-tree
        ref="xtree"
        :data="editions"
        :options="options"
        @click="onClick">
    </x-tree>
</template>

<script>
import {R_SITEMAP_TABLE} from '@/router/routs'


export default {
    name: 'EditionTree',
    props: {
        e_id: {}
    },
    data() {
        return {
            options: {
                customNodeEdit: true,
                propertyNames: {
                    text: 'e_title',
                    children: 'children',
                    id: 'e_id'
                }
            },
        }
    },
    computed: {
        editions() {
            return [{
                e_id: '0',
                e_title: 'All Editions',
                children: this.$store.getters['pages/editions'].map(item => {
                    return {
                        e_id: item.e_id,
                        e_title: item.e_title + (!!parseInt(item.e_isdefault) ? ' (default)' : ''),
                        state: {
                            'selected': +item.e_id === +this.$route.params.e_id,
                            'selectable': true,
                            'append': false,
                            'editable': false,
                            'deleteble': false,
                            'menu': true
                        },
                    }
                }),
                state: {
                    'selected': !parseInt(this.$route.params.e_id),
                    "expanded": true,
                    'selectable': true,
                    'menu': false
                },
                data: {
                    type: 'root'
                }
            }]
        }
    },
    methods: {
        onClick(node) {
            switch (node.data.type) {
                case 'root':
                    this.$router.push({
                        name: R_SITEMAP_TABLE,
                        params: {
                            e_id: null,
                        }
                    })
                    break
                default:
                    this.$router.push({
                        name: R_SITEMAP_TABLE,
                        params: {
                            e_id: node.id,
                        }
                    })
            }
        },
    },
}
</script>

<style scoped>

</style>
