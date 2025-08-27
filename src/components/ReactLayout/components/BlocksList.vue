<template>
    <div class="blocks-list">
        <div class="blocks-list-header">
            <h3 class="blocks-list-legend">
                Available blocks
            </h3>
            <search-block-input v-model="filter"/>
            <action-group class="blocks-list-header__actions">
                <new-block-action/>
                <setup-filter-action/>
            </action-group>
        </div>

        <screen-scroll-container :height-option="3">
            <b-list-group>
                <Container
                    group-name="1"
                    behaviour="copy"
                    :get-child-payload="getChildPayload"
                    :get-ghost-parent="getGhostParent"
                    :remove-on-drop-out="false">
                    <Draggable v-for="item in blocks" :key="item['react_id']">
                        <b-list-group-item button class="blocks-list-item draggable-item">
                            <icon :icon="$icons.pageblock"></icon>
                            {{ item.react_title }}
                        </b-list-group-item>
                    </Draggable>
                </Container>
            </b-list-group>
        </screen-scroll-container>
    </div>
</template>

<script>
import {Container, Draggable} from "vue-smooth-dnd";
import SearchBlockInput from "@/components/ReactLayout/components/SearchBlockInput";
import NewBlockAction from "@/components/ReactLayout/components/NewBlockAction";
import SetupFilterAction from "@/components/ReactLayout/components/SetupFilterAction";

export default {
    name: 'BlocksList',
    components: {
        NewBlockAction,
        SearchBlockInput,
        Container,
        Draggable,
        SetupFilterAction
    },
    data() {
        return {
            filter: ''
        }
    },
    computed: {
        blocks() {
            let blocks = Object.values(this.$store.state.rl.blocks)
            if (this.filter) {
                blocks = blocks.filter(b => {
                    return b.react_title.toLowerCase().includes(this.filter.toLowerCase())
                })
            }
            return blocks.sort(function (a, b) {
                return a.react_title.localeCompare(b.react_title)
            })
        },

    },
    methods: {
        getChildPayload(index) {
            return {react_id: this.blocks[index]['react_id']}
        },
        getGhostParent() {
            return document.body;
        },
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/vue-component";

.blocks-list {
    .blocks-list-header {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 0.5rem;
        margin-bottom: .5rem;

        > * {
            flex: 1 1 auto;
        }

        &__actions {
            flex: 0 0 auto;
        }
    }

    .blocks-list-legend {
        margin: 0;
        padding: 0.4rem;
        font-size: .875rem;
        color: $primary;
        font-weight: 600;
    }

    position: sticky;
    top: 57px;
    z-index: 100;
    display: block;
    height: 100%;

    .list-group-item {
        padding: 0.4rem;
    }
}

</style>
