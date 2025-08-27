<template>
    <dialog-modal
        v-bind="$dialogsProps"
        @hide="onModalHide"
        @hidden="onModalHidden"
        :ok-disabled="okDisabled"
        size="lg"
        ref="modal">
        <div class="manual-permalink-dialog">

            <x-form-group title="URL">
                <b-form-input id="p_url"
                              v-model="localValue.p_url"
                              autocomplete="off"
                              @keypress.native="onKeypress"
                              trim ref="input"
                              :required="true">
                </b-form-input>
            </x-form-group>
            <x-form-group title="Redirect">
                <b-form-group v-slot="{ ariaDescribedby }">
                    <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="NO"
                                  class="mb-3">
                        No
                    </b-form-radio>
                    <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios"
                                  value="PRIMARY" class="mb-3">
                        Redirect to primary permalink
                    </b-form-radio>

                    <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="URL">
                        <div class="d-flex align-content-center">
                            <div class="mr-2 flex-shrink-0">Redirect to URL</div>
                            <b-form-input
                                v-model="redirect_url"
                                ref="redirect_url"
                                @input="onInputRedirectUrl"
                                :required="selected==='URL'"
                                class="redirect-url-input">
                            </b-form-input>
                        </div>
                    </b-form-radio>
                </b-form-group>
            </x-form-group>
        </div>
    </dialog-modal>
</template>

<script>

import withBModal from "@modules/dialogs/mixins/withBModal";

export default {
    name: "ManualPermalinkDialog",
    mixins: [withBModal],
    props: {},
    data() {
        return {
            selected: 'NO',
            redirect_url: '',
        }
    },
    computed: {
        okDisabled() {
            return !this.localValue.p_url || this.selected === 'URL' && !this.redirect_url;
        },
    },
    watch: {
        selected(val) {
            if (val === 'URL') {
                this.$nextTick(() => {
                    this.$refs.redirect_url.focus();
                });
            } else {
                this.localValue.p_redirect = val;
            }
        },
        redirect_url() {
            if (this.selected === 'URL') {
                this.localValue.p_redirect = this.redirect_url;
            }
        }
    },
    created() {
        this.localValue = {
            p_urp: null,
            p_redirect: 'NO',
        };
    },
    methods: {
        onKeypress(e) {
            if (e.keyCode === 13) {
                this.$refs.modal.hide('ok')
            }
        },
        onInputRedirectUrl() {
            this.selected = 'URL';
        },
    }
}
</script>
<style lang="scss">
.manual-permalink-dialog {
    .custom-control-label {
        width: 100%;
    }

    .redirect-url-input {
        margin-top: -7px;
    }
}
</style>
