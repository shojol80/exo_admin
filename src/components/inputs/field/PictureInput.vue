<template>
    <div class="picture-input">
        <div class="picture-input__row">
            <action-group v-show="!useCustomFileID">
                <b-img v-if="!!value.file_id && !showRecovery && isImage"
                       :id="`tooltip-target-pic-${_uid}`"
                       class="picture-input__img mr-2"
                       fluid
                       :src="'/media/preview/'+value.file_id+'?height=50&width=50'"
                       alt="file preview"
                       @error="imageLoadError">
                </b-img>
                <action-button v-if="showRecovery" @action="recovery">
                    <span class="text-danger mr-1"><icon icon="img_not_found"></icon></span>
                    File not found! Recovery?
                </action-button>
                <b-popover :target="`tooltip-target-pic-${_uid}`"
                           variant="secondary"
                           triggers="click, hover">
                    <b-img v-if="!!value.file_id"
                           class="picture-input__preview"
                           fluid
                           :src="'/media/preview/'+value.file_id+'?height=300&width=600'"
                           alt="file">
                    </b-img>
                </b-popover>
                <action-button :icon="$icons.folder"
                               title="Select file"
                               @action.prevent="editPicture"
                               class="fe-file__button">
                    {{ fileName }}
                </action-button>
                <action-button icon="fas fa-times"
                               v-show="!!value.file_id"
                               title="clear"
                               @action.prevent="resetPicture"
                               class="fe-file__button">
                </action-button>
                <action-button
                    icon="fas fa-sliders-h"
                    title="Show more settings"
                    @action.prevent="$root.$emit('bv::toggle::collapse',`items-collapse:${_uid}`)">
                    Settings
                </action-button>
            </action-group>
        </div>
        <b-collapse :id="`items-collapse:${_uid}`" class="mt-2">
            <b-card class="picture-input__inputs">
                <x-form-group title="File ID">
                    <b-input-group>
                        <b-input-group-prepend is-text>
                            <input type="checkbox" v-model="useCustomFileID">
                        </b-input-group-prepend>
                        <b-form-input v-model="value.file_id" :disabled="!useCustomFileID"></b-form-input>
                    </b-input-group>
                </x-form-group>
                <x-form-input title="Alternative text"
                              v-model="value.alt">
                </x-form-input>
                <x-form-group title="File name">
                    <b-input-group>
                        <b-input-group-prepend is-text>
                            <input type="checkbox" v-model="useCustomName">
                        </b-input-group-prepend>
                        <b-form-input v-model="customFileName" :disabled="!useCustomName"></b-form-input>
                    </b-input-group>
                </x-form-group>
                <x-form-group
                    :control-padding="true"
                    title="Lazy loading">
                    <template v-slot:info>
                        polyfill - will add prefix "data-" to "src", "srcset" attributes and add class "lazysizes".
                        You need include JavaScript of polifyll
                        <a href="https://github.com/aFarkas/lazysizes">lazysizes</a> to your template or add your
                        custom implementation
                    </template>
                    <b-form-radio-group
                        v-model="value.lazy"
                        :options="lazyOptions"
                        name="lazy-options"
                    ></b-form-radio-group>
                </x-form-group>
                <x-form-switch
                    v-show="!!useCustomName && !!customFileName || !!value.alt"
                    title="Add to sitemap"
                    v-model="value.sitemap">
                </x-form-switch>
                <x-form-text-area v-show="isDeveloper" title="Render params" v-model="value.params"></x-form-text-area>
            </b-card>
        </b-collapse>
    </div>
</template>
<script>
import getFilenameExtension from '@/shared/getFilenameExtension'
import PickFileDialog from '@/components/dialogs/PickFileDialog'
import pictureEmptyValue from '@/shared/pictureEmptyValue'
import filemanager from '@/services/api/filemanager'
import authorization from '@/mixins/authorization'
import ExoFileService from '@modules/ExoFileService'
import {R_MAINTENANCE} from "@modules/routs";

export default {
    name: 'PictureInput',
    mixins: [authorization],
    model: {
        prop: 'value',
        event: 'input'
    },
    props: {
        value: {}
    },
    data() {
        return {
            showRecovery: false,
            useCustomFileID: false,
            useCustomName: false,
            originalFileName: '',
            lazyOptions: [
                {text: 'Disabled', value: '0'},
                {text: 'Native', value: '1'},
                {text: 'Polyfill', value: '2'}
            ]
        }
    },
    computed: {
        isImage() {
            if (!this.fileName) return false
            return this.$store.state.ECO.files.extensions.img.includes(getFilenameExtension(this.fileName))
        },
        fileName() {
            if (!this.value.file_id) return 'File not selected'
            if (this.originalFileName) return this.originalFileName
            const [disk, path] = ExoFileService.parseFileId(this.value.file_id)
            return path
        },
        customFileName: {
            get() {
                if (this.useCustomName) {
                    return this.value.file_name
                } else {
                    return this.fileName
                }
            },
            set(value) {
                if (this.useCustomName) {
                    this.value.file_name = value
                }
            }
        }
    },
    watch: {
        'value.file_id': {
            immediate: true,
            async handler() {
                if (this.useCustomFileID) {
                    this.originalFileName = ''
                } else {
                    if (!this.value.file_id) return
                    let [disk, path] = ExoFileService.parseFileId((this.value.file_id))
                    try {
                        let file = await filemanager.props({disk, path}, {preventShowError: true})
                        this.originalFileName = file.basename
                    } finally {

                    }
                }
            }
        },
        useCustomName() {
            if (!this.useCustomName) {
                this.value.file_name = ''
            }
        }
    },
    methods: {
        async editPicture() {
            const settings = {};

            if (this.value.file_id) {
                settings.startSelection = this.value.file_id
            }
            let response = await this.$dialogs.show(PickFileDialog, {
                title: 'Select file',
                settings
            })
            if (response.trigger !== 'ok') return
            this.showRecovery = false
            this.useCustomFileID = false
            this.originalFileName = response.value.files[0].basename;
            this.value.file_id = ExoFileService.selectionToFileId(response.value)
        },
        empty() {
            return pictureEmptyValue()
        },
        resetPicture() {
            this.showRecovery = false
            this.$emit('input', this.empty())
        },
        recovery() {
            this.$router.push({name: R_MAINTENANCE, params: {processId: 5}})
        },
        imageLoadError() {
            this.showRecovery = true
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/vue-component";

.picture-input {
    &__row {

    }

    &__img {
        max-height: 33px;
        padding: 1px;
        border: 1px solid $input-border-color;
    }

    &__inputs {
        margin-bottom: 0;

        .card-body {
            padding: .75rem;
        }
    }

    &__preview {
        background-color: $tooltip-bg;
    }
}

.compact {
    .picture-input {
        &__inputs {
            width: 100%;
        }
    }
}
</style>
