<template>
    <div class="fq-dnd-container"
         :class="{'fq-dnd-container--empty':!form_questions || form_questions.length===0}"
         data-empty-title="Drag a field from the right to this area">
        <Container group-name="1"
                   class="list-group"
                   :get-child-payload="getChildPayload"
                   @drop="onDrop"
                   drag-handle-selector=".column-drag-handle"
                   :drop-placeholder="placeholderOptions">
            <Draggable v-for="(item, index) in form_questions" :key="item.fq_id">
                <component v-bind:is="getComponent(item.fq_type)"
                           :fq="form_questions[index]"
                           @change="onChange(index,$event)"
                           :active="active===index"
                           @delete="onDeleteQuestion(item,index)"
                           @collapse="collapse(index)"
                           class="draggable-item list-group-item">
                </component>
            </Draggable>
        </Container>
    </div>
</template>

<script>
import {Container, Draggable} from "vue-smooth-dnd"
import fqtBase from "@/components/FormBuilder/components/fqt/fqtBase.vue"
import fqtMulti from "@/components/FormBuilder/components/fqt/fqtMulti.vue"
import fqtContainer from "@/components/FormBuilder/components/fqt/fqtContainer.vue"
import fqtSection from "@/components/FormBuilder/components/fqt/fqtSection.vue"
import helpers from "@/components/FormBuilder/mixins/helpers"
import presetHelper from "@/components/FormBuilder/mixins/presetHelper"
import store from "@/components/FormBuilder/store"

export default {
    name: "FqDndContainer",
    mixins: [helpers, presetHelper],
    components: {
        Container,
        Draggable,
        fqtBase,
        fqtMulti,
        fqtContainer,
        fqtSection,
    },
    model: {
        prop: 'form_questions',
        event: 'change'
    },
    props: {
        form_questions: {type: Array},
    },
    data() {
        return {
            active: -1,
            placeholderOptions: {
                className: 'fq-drop-preview',
                animationDuration: '150',
                showOnTop: false
            },
        }
    },
    computed: {
        isEmpty() {
            return !this.form_questions || this.form_questions.length === 0
        },
    },
    methods: {
        collapse(index) {
            this.active = this.active === index ? -1 : index
        },

        onDrop(dropResult) {

            const {removedIndex, addedIndex, payload} = dropResult

            if (removedIndex === null && addedIndex === null) return

            let itemToAdd = payload;

            if (payload.fqt_name) {
                //new fq
                const fq_name = this.getUniqueName(payload.fqt_name)
                itemToAdd = this.buildFq({
                    fq_name: fq_name,
                    fq_displayname: fq_name,
                    fq_type: payload.fqt_id
                })
                //open new question
                this.active = addedIndex;

            } else if (payload.fq) {
                //preset
                const fq_name = this.getUniqueName(payload.fq.fq_name)
                itemToAdd = this.buildFq({...payload.fq, fq_name, fq_displayname: fq_name})
                //open new question
                this.active = -1;
            } else {
                if (removedIndex === this.active) {
                    this.active = addedIndex
                } else if (addedIndex <= this.active && removedIndex >= this.active) {
                    this.active++
                } else if (addedIndex >= this.active && removedIndex <= this.active) {
                    this.active--
                }
            }

            const result = this.form_questions

            if (removedIndex !== null) {
                itemToAdd = result.splice(removedIndex, 1)[0]
            }

            if (addedIndex !== null) {
                result.splice(addedIndex, 0, itemToAdd)
            }
        },

        getChildPayload(index) {
            return this.form_questions[index]
        },

        getComponent(fqt_id) {
            let fqt = this.fqt.find(item => {
                return +item.fqt_id === +fqt_id
            })
            return fqt && fqt['builder'] && fqt['builder']['component'] || 'fqtBase'
        },

        onDeleteQuestion(fq, index) {
            const result = this.form_questions.filter(item => item !== fq)

            if (index === this.active) {
                this.active = -1
            }
            this.$emit('change', result)
        },

        getUniqueName(fq_name) {
            return store.getUniqueName(fq_name)
        },

        onChange(index, $event) {
            this.form_questions[index] = event
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/vue-component";

.fq-dnd-container {
    position: relative;

    &--empty {
        border: $drop-zone-border;
        background-color: $drop-zone-color;

        &:after {
            position: absolute;
            transform: translate(-50%, -50%);
            font-size: 1rem;
            color: $gray-400;
            top: 50%;
            left: 50%;
            text-align: center;
            content: attr(data-empty-title);
        }
    }

    .fq-drop-preview {
        background-color: darken($card-bg, 10);
        border: $card-border-width solid $card-border-color;
        border-radius: $card-border-radius;
        z-index: 10;
    }

    .smooth-dnd-container {
        min-height: 36px;
    }

    .smooth-dnd-container.vertical > .smooth-dnd-draggable-wrapper {
        overflow: visible;
    }
}
</style>
