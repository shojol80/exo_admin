<template>
    <x-tree :options="options" :data="groupsTree"></x-tree>
</template>

<script>
export default {
    data() {
        return {
            groupsTree: [{
                id:1,
                text: 'Node 1',
                children: [
                    {
                        id:2,
                        text: 'Node 1-1',
                    },
                    {
                        id:3,
                        text: 'Node 1-2',
                    }
                ]
            },
                {
                    id:4,
                    text: 'Node 3',
                    children: [
                        {
                            id:5,
                            text: 'Node 2-1',
                        },
                        {
                            id:6,
                            text: 'Node 2-2',
                        }
                    ]
                }],
            options: {
                customNodeEdit: true,
                propertyNames: {
                    text: 'text',
                    children: 'children',
                    id: 'id'
                }
            },
        }
    }
}
</script>

<style scoped>

</style>
