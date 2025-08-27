<template>
    <div class="list-base">
        <h3 class="list-base-legend">
            {{title}}
        </h3>
        <b-list-group>
            <Container
                group-name="1"
                behaviour="copy"
                :get-child-payload="getChildPayload"
                :get-ghost-parent="getGhostParent"
                :remove-on-drop-out="false">
                <Draggable v-for="item in items" :key="item[keyName]">
                    <b-list-group-item button class="list-base-item draggable-item">
                        <slot :item="item"></slot>
                    </b-list-group-item>
                </Draggable>
            </Container>
        </b-list-group>
    </div>

</template>

<script>
import helpers from '../mixins/helpers'
import {Container, Draggable} from 'vue-smooth-dnd'

export default {
    name: "ListBase",
    mixins: [helpers],
    components: {Container, Draggable},
    props: {
        items: {
            type: Array,
            required: true
        },
        keyName: {
            type: String,
            required: true
        },
        title: {
            type: String,
            default: ''
        }
    },
    methods: {
        getChildPayload(index) {
            return this.items[index]
        },
    }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/vue-component";

.list-base-legend {
    margin: 0;
    padding: 0.4rem;
    font-size: $font-size-base;
    color: $primary;
    font-weight: 600;
}

.list-base-item {
    padding: 0.4rem;
    cursor: move;
}
</style>
