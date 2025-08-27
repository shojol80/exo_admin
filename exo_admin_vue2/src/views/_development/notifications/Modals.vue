<template>
    <div class="wrapper">
        <div class="animated fadeIn">
            <b-row>
                <b-col cols="6">
                    <b-card>
                        <div slot="header"><i class='fa fa-align-justify'></i><b> $dialog</b> modals</div>
                        <b-button type="button" variant="secondary" @click="onConfirm" class="mr-1">confirm dialog
                        </b-button>
                        <b-button type="button" variant="secondary" @click="onPrompt" class="mr-1">prompt dialog
                        </b-button>
                        <b-button type="button" variant="secondary" @click="onCustom" class="mr-1">Custom component
                            dialog
                        </b-button>
                        <b-button type="button" variant="secondary" @click="onPromptNewReactDialog" class="mr-1">
                            PromptNewReactDialog
                        </b-button>
                        <hr>
                        <b-button type="button" variant="primary" @click="primaryModal = true" class="mr-1">Aside
                            dialog
                        </b-button>
                    </b-card>
                </b-col><!--/.col-->
                <b-col cols="6">
                    <b-card>
                        <div slot="header"><i class='fa fa-align-justify'></i> Bootstrap Modals</div>
                        <b-button type="button" variant="secondary" @click="myModal = true" class="mr-1">Launch demo
                            modal
                        </b-button>
                        <b-button type="button" variant="secondary" @click="largeModal = true" class="mr-1">Launch large
                            modal
                        </b-button>
                        <b-button type="button" variant="secondary" @click="smallModal = true" class="mr-1">Launch small
                            modal
                        </b-button>
                        <hr>
                        <b-button type="button" variant="primary" @click="primaryModal = true" class="mr-1">Launch
                            primary modal
                        </b-button>
                        <b-button type="button" variant="success" @click="successModal = true" class="mr-1">Launch
                            success modal
                        </b-button>
                        <b-button type="button" variant="warning" @click="warningModal = true" class="mr-1">Launch
                            warning modal
                        </b-button>
                        <b-button type="button" variant="danger" @click="dangerModal = true" class="mr-1">Launch danger
                            modal
                        </b-button>
                        <b-button type="button" variant="info" @click="infoModal = true" class="mr-1">Launch info
                            modal
                        </b-button>
                    </b-card>
                </b-col><!--/.col-->
            </b-row><!--/.row-->
        </div>

        <!-- Modal Component -->
        <b-modal title="Modal title" v-model="myModal" @ok="myModal = false">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </b-modal>
        <b-modal title="Modal title" size="lg" v-model="largeModal" @ok="largeModal = false">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </b-modal>
        <b-modal title="Modal title" size="sm" v-model="smallModal" @ok="smallModal = false">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </b-modal>

        <b-modal title="Modal title" modal-class="modal-primary" v-model="primaryModal" @ok="primaryModal = false">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </b-modal>
        <b-modal title="Modal title" modal-class="modal-success" v-model="successModal" @ok="successModal = false"
                 ok-variant="success">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </b-modal>
        <b-modal title="Modal title" modal-class="modal-warning" v-model="warningModal" @ok="warningModal = false"
                 ok-variant="warning">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </b-modal>
        <b-modal title="Modal title" modal-class="modal-danger" v-model="dangerModal" @ok="dangerModal = false"
                 ok-variant="danger">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </b-modal>
        <b-modal title="Modal title" modal-class="modal-info" v-model="infoModal" @ok="infoModal = false"
                 ok-variant="info">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </b-modal>
    </div>

</template>

<script>

import PickFileDialog from "@/components/dialogs/PickFileDialog";
import PromptNewReactDialog from "@/components/dialogs/PromptNewReactDialog";

export default {
    name: 'modals',
    data() {
        return {
            myModal: false,
            largeModal: false,
            smallModal: false,
            primaryModal: false,
            successModal: false,
            warningModal: false,
            dangerModal: false,
            infoModal: false
        }
    },
    methods: {
        async onConfirm() {
            const response = await this.$dialogs.confirm({
                message: 'Do you want to confirm this confirmation?',
                hideHeaderClose: false,
                okTitle: 'CONFIRM?'
            })
            this.$awn.info(`trigger:${response.trigger}, value:${response.value}`,)
        },
        async onPrompt() {
            const response = await this.$dialogs.prompt({
                message: 'Enter your favorite number?',
                hideHeaderClose: false,
                required: true,
                value: 'Start value'
            })
            this.$awn.info(`trigger:${response.trigger}, value:${response.value}`,)
        },
        async onCustom() {
            /*
            const response = await this.$dialogs.show(DeleteUser, {
                message: 'Do you want to delete everything?',
            })
            this.$awn.info(`trigger:${response.trigger}, value:${response.value}, cascade:${response.cascade}`)
            */
            const response = await this.$dialogs.show(PickFileDialog, {
                title: 'Select file',
            })
            this.$awn.info(`trigger:${response.trigger}, value:${response.value}, baseName:${response.value.files[0].basename}`)

        },
        async onPromptNewReactDialog() {
            let response = await this.$dialogs.show(PromptNewReactDialog, {
                forms: []
            })
            this.$awn.info(`trigger:${response.trigger}, value:${response.value}`)
        },
    }
}
</script>
