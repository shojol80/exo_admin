<template>
    <app-screen>
        <div class="tiny-mce-styles">
            <waiter ref="waiter">
                <b-tabs class="x-tabs">
                    <b-tab ref="stylesTab" active class="tab-no-padding" lazy>
                        <template #title>
                            <icon :icon="$icons.wizard"></icon>
                            Styles
                        </template>
                        <related-styles></related-styles>
                    </b-tab>
                    <b-tab class="tab-no-padding" lazy>
                        <template #title>
                            <icon :icon="$icons.variables"></icon>
                            Style formats
                        </template>
                        <style-formats></style-formats>
                    </b-tab>
                </b-tabs>
            </waiter>
        </div>
    </app-screen>
</template>

<script>

import StyleFormats from "@/views/editors/parties/StyleFormats";
import RelatedStyles from "@/views/editors/parties/RelatedStyles";

export default {
    name: 'TinyMceStyles',
    components: {RelatedStyles, StyleFormats}
}
</script>

<style lang="scss">
@import "src/assets/scss/vue-component";

.tiny-mce-styles {
    .tab-no-padding {
        padding: 0;
    }

    .x-code-editor--full-height {
    }

    .x-code-editor--full-height {
        height: calc(100vh - #{$app-header-height} - #{$action-toolbar-height} - #{$tab-toolbar-height});
        //padding-bottom: 0;
    }
}


.mode-popup .tiny-mce-styles .x-code-editor--full-height {
    height: calc(100vh - #{$popup-header-height} - #{$action-toolbar-height} - #{$tab-toolbar-height});
}
</style>
