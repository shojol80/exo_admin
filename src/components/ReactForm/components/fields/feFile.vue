<template>
    <ValidationProvider class="fe-control fe-file"
                        tag='div' :name="fq.label"
                        :rules="ruleObject"
                        v-slot="{ errors, valid }">
        <fe-base-control
            :state="inputState(errors,valid)">
            <label :for="id"
                   class="fe-control__label">
                {{ fq.label }}
                <field-info-icon :fq="fq"></field-info-icon>
            </label>
            <div class="d-flex justify-content-between align-items-start">
                <div class="w-50">
                    <x-form-group title="File">
                        <action-group v-show="!useCustomFileID">
                            <action-button :icon="$icons.folder"
                                           title="Select file"
                                           @action.prevent="onActionEdit"
                                           class="fe-file__button">
                                <span class="ml-2">{{ fileName }}</span>
                            </action-button>
                            <action-button icon="fas fa-times"
                                           v-show="!!value"
                                           title="clear"
                                           @action.prevent="value=''"
                                           class="fe-file__button">
                            </action-button>
                        </action-group>
                    </x-form-group>
                    <x-form-group title="File ID">
                        <b-input-group>
                            <b-input-group-prepend is-text>
                                <input type="checkbox" v-model="useCustomFileID">
                            </b-input-group-prepend>
                            <b-form-input v-model="value" :disabled="!useCustomFileID"></b-form-input>
                        </b-input-group>
                    </x-form-group>
                </div>
                <div class="fe-file__file m-auto">
                    <div class="fe-file__preview">
                        <b-img v-if="isImage" thumbnail fluid :src="'/media/preview/'+value+'?height=100&width=400'"
                               :alt="fq.fq_file_name"></b-img>
                    </div>
                </div>
            </div>
        </fe-base-control>
        <input type="hidden" v-model="value">
        <invalid-feedback :id="id" :errors="inputErrors(errors)"></invalid-feedback>

    </ValidationProvider>
</template>

<script>

import inputs from './mixins/inputs'
import feBaseControl from '../feBaseControl'
import getFilenameExtension from '@/shared/getFilenameExtension'
import PickFileDialog from '@/components/dialogs/PickFileDialog'
import FieldInfoIcon from '@/components/ReactForm/components/FieldInfoIcon'
import ExoFileService from '@modules/ExoFileService'

export default {
    name: "feFile",
    mixins: [inputs],
    components: {FieldInfoIcon, feBaseControl},
    data() {
        return {
            useCustomFileID: false,
            originalFileName: '',
            isSelected: false,
        }
    },
    computed: {
        isImage() {
            if (!this.fileName) return false
            return this.$store.state.ECO.files.extensions.img.includes(getFilenameExtension(this.fileName))
        },
        fileName() {
            if (!this.value) return 'File not selected'
            return this.originalFileName
        },
    },
    methods: {
        async onActionEdit() {
            let response = await this.$dialogs.show(PickFileDialog, {
                title: 'Select file',
            })
            if (response.trigger !== 'ok') return
            this.originalFileName = response.value.files[0].basename;
            this.value = ExoFileService.selectionToFileId(response.value)
            this.isSelected = true
        },
        //this method call watcher from mixin input
        onChangeValue() {
            if (this.useCustomFileID) {
                this.originalFileName = ''
            }
            this.$emit('change', {fq_id: this.fq.fq_id, value: this.value ? this.value : '0'})
        },
        onChangeFqValue(newValue) {
            if (newValue === '0') this.value = ''
            else this.value = newValue
            if (!this.isSelected) {
                this.originalFileName = this.fq.file_name;
            }
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/vue-component";


.fe-file {
    min-height: 110px;

    &__preview {
        max-height: 150px;
        max-width: 50%;
        margin: auto;
    }
}
</style>
