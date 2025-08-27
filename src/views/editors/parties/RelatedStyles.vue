<template>
    <div class="related-styles">
        <waiter ref="waiter">
            <action-toolbar>
                <action-group>
                    <action-button
                        @action="onActionConfirm()"
                        title="Save and close"
                        :icon="$icons.confirm">
                    </action-button>
                    <action-button
                        title="Save"
                        :icon="$icons.save"
                        @action="onActionSave"
                        shortkey="['ctrl', 's']">
                    </action-button>
                    <action-button
                        title="Reload"
                        :icon="$icons.reload"
                        @action="onActionReload">
                    </action-button>
                </action-group>
            </action-toolbar>
            <div v-if="css_id">
                <h4 class="text-muted p-5 text-center">You can't use format styles with Custom CSS in one time.
                    Unset custom css to use format styles.</h4>
            </div>
            <div v-else class="related-styles__list p-3">
                <template v-if="styles.length">
                    <b-form-group v-for="format in style_formats" :key="format.title"
                                  class="related-styles__group mb-0">
                        <format-checkbox-group
                            :format="format"
                            v-model="styles_object[format['title']]"/>
                    </b-form-group>
                </template>

            </div>
        </waiter>
    </div>
</template>

<script>
import editor from '@/services/api/editor'
import _ from 'lodash'
import exoEventBus from "@modules/exoEventBus";
import FormatCheckboxGroup from "@/views/editors/parties/FormatCheckboxGroup.vue";
import expandStyles from "@modules/utils/expandStyles";


export default {
    name: 'RelatedStyles',
    components: {FormatCheckboxGroup},
    data() {
        return {
            css_id: null,
            style_formats: [],
            styles: [],
            styles_object: {}
        }
    },
    computed: {},
    async mounted() {
        await this.load();
    },
    methods: {
        convertToObject(styles) {
            const styles_all = this.style_formats.map(sf => {
                const style = styles.find(s => s.title === sf.title) || {
                    title: sf.title,
                    selected: false,
                    items: []
                }
                if (style.selected && sf.items) {
                    style.items = sf.items.map(s => s.title)
                }
                return style
            })
            return styles_all.reduce((acc, style) => {
                acc[style.title] = style
                return acc
            }, {})
        },
        convertToArray(styles_object) {
            return Object.values(styles_object)
        },
        async load() {
            await this.$refs.waiter.wait(Promise.all([
                this.getStyleFormats(),
            ]))
            await this.getRelatedStyles()
        },

        async getStyleFormats() {
            let {content: content} = await editor.getStyleFormats()
            try {
                this.style_formats = _.get(JSON.parse(content), 'style_formats')
            } catch (e) {
                this.style_formats = {}
                this.$awn.alert('Can`t parse formats file. Please check syntax.')
            }
        },
        async getRelatedStyles() {
            this.styles = expandStyles(await editor.getRelatedStyles({
                optionId: this.$route.query.option_id,
                optionField: this.$route.query.option_field,
            }))
            this.styles_object = this.convertToObject(this.styles)
        },

        async saveRelatedStyles() {
            const styles = this.convertToArray(this.styles_object)
            editor.saveRelatedStyles(
                {
                    styles: styles,
                    optionId: this.$route.query.option_id,
                    optionField: this.$route.query.option_field,
                }
            )
        },


        async onActionSave() {
            await this.saveRelatedStyles()
        },

        async onActionReload() {
            await this.getRelatedStyles()
        },

        async onActionConfirm() {
            await this.saveRelatedStyles()
            exoEventBus.$emit('exolog-exo-modal-cancel');
        },
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/vue-component";

.related-styles {
    &__list {
        column-count: 2;
    }

    &__group {
        display: block;
        >div {
            display: inline-block;
        }
    }
}


.mode-popup .related-styles__list {
    min-height: calc(100vh - #{$popup-header-height} - #{$action-toolbar-height} - #{$tab-toolbar-height});
}
</style>
