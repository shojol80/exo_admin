<template>
    <b-modal modal-class="modal-primary modal-min-btn link-domain-modal"
             v-model="isOpen"
             :title="title"
             hide-header-close
             centered
             cancel-title="CANCEL"
             @cancel="onCancel"
             cancel-variant="light"
             @ok="onSave"
             ok-title="OK"
             ok-variant="primary"
             ref="modal">
        <waiter ref="waiter">
            <div>
                <b-tabs fill v-model="activeTab">
                    <b-tab title="Select domain" active>
                        <p></p>
                        <x-select v-model="selectedDomain"
                                  :clearable="false"
                                  :multiple="false"
                                  :options="domains"
                                  valueFormat="object"
                                  id-key="domain_id"
                                  label-key="domain_name"/>
                    </b-tab>
                    <b-tab title="Add new subdomain">
                        <ValidationObserver ref="observer" v-slot="{ invalid, errors }">
                            <p></p>
                            <div class="link-domain-modal__subdomain">
                                <div>
                                    <ValidationProvider :rules="ruleObject"
                                                        name="subdomain"
                                                        :debounce="200"
                                                        v-slot="{ valid, errors }">
                                        <b-input v-model="subdomainValue"
                                                 class="link-domain-modal__subdomain-value"
                                                 :state="errors[0] ? false : null"
                                        />
                                    </ValidationProvider>
                                </div>
                                <span class="px-1">.</span>
                                <x-select v-model="subdomainParent"
                                          :clearable="false"
                                          :multiple="false"
                                          :options="parentDomains"
                                          valueFormat="object"
                                          id-key="domain_id"
                                          label-key="domain_name"/>
                            </div>
                            <div class="mt-2">
                                <p v-for="(error,index) in errors" :key="index" class="text-danger">
                                    <template v-for="(message,index) in error">
                                        <span :key="index">
                                        {{message}}
                                    </span><br>
                                    </template>
                                </p>
                            </div>
                        </ValidationObserver>
                    </b-tab>
                </b-tabs>
            </div>
        </waiter>
    </b-modal>
</template>

<script>

import domains from '@/services/api/domains'

export default {
    name: "LinkDomainModal",
    props: {
        modalProps: {},
        title: {default: 'Domains'},
        open: false,
        domains: Array,
        parentDomains: Array
    },
    data() {
        return {
            ruleObject: {
                required: true,
                regex: /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/,
            },
            selectedDomain: null,
            subdomainValue: null,
            subdomainParent: null,
            isOpen: false,
            activeTab: 0
        }
    },
    computed: {},
    watch: {
        open(newVal) {
            if (newVal) {
                this.isOpen = true;
            }
        },
        parentDomains(newVal) {
            this.subdomainParent = newVal[0]
        },
        domains(newVal) {
            this.selectedDomain = newVal[0]
        }
    },
    methods: {
        show() {
            this.subdomainValue = ''
            return new Promise((resolve) => {
                this.resolve = resolve;
                if (this.default) {
                    this.value = this.default
                } else {
                    this.value = null
                }
                this.$refs.modal.show();
            })
        },
        onCancel(e) {
            this.resolve(false)
        },
        onSave(e) {
            if (this.resolve) {

                if (this.activeTab === 1) {
                    e.preventDefault()
                    this.$refs.waiter.wait(
                        this.$refs.observer.validate()
                            .then(isValid => {

                                if (!isValid) {
                                    return
                                }
                                return domains.validateSubdomain({subdomain: this.subdomainValue + '.' + this.subdomainParent.domain_name})
                            })
                            .then(data => {
                                if (data.length) {
                                    this.$refs.observer.setErrors({
                                        subdomain: data
                                    });
                                } else {
                                    let value = {
                                        subdomainValue: this.subdomainValue,
                                        subdomainParent: this.subdomainParent
                                    }

                                    this.isOpen = false;
                                    this.resolve(value)
                                }
                            })
                    )
                } else {
                    this.resolve(this.selectedDomain)
                }

            }
        }
    }
}
</script>

<style lang="scss">
.link-domain-modal {

    .tab-content {
        min-height: 200px;
    }

    &__subdomain {
        display: flex;
        align-items: flex-end;

        .x-select {
            flex: 1 0 auto;
        }
    }

    &__subdomain-value {
        width: 140px
    }
}
</style>
