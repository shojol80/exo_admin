<template>
    <div class="domain-list">
        <b-list-group>
            <b-list-group-item v-for="domain in domains" :key="domain.domain_id"
                               class="d-flex justify-content-between align-items-center">
                <domain-name :domain="domain">
                </domain-name>
                <action-group class="domain-list__actions">
                    <action-button
                        v-if="+domain.domain_isdefault!==1"
                        @action="onActionDefault(domain)"
                        title="Set domain default"
                        :icon="$icons.pin">
                    </action-button>
                    <action-button
                        v-if="+domain.is_readonly!==1"
                        @action="onActionUnlink(domain)"
                        title="Unlink domain"
                        :icon="$icons.unlink">
                    </action-button>
                </action-group>
            </b-list-group-item>
        </b-list-group>
        <action-group class="mt-1">
            <action-button @action="onActionLink()"
                           title="Link domain"
                           :icon="$icons.link">
            </action-button>
        </action-group>
        <link-domain-modal ref="modal" :domains="availableDomains" :parent-domains="allDomains"></link-domain-modal>
    </div>
</template>

<script>
import LinkDomainModal from '@/components/LinkDomainModal'
import DomainName from '@/components/DomainName'
import genID from '@modules/mixins/genID'
import domains from '@/services/api/domains'

export default {
    name: 'EntityDomainList',
    mixins: [genID],
    components: {
        LinkDomainModal,
        DomainName
    },
    model: {
        prop: 'domains',
        event: 'change'
    },
    props: {
        domains: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {
            //allDomains: [],
        }
    },
    computed: {
        allDomains() {
            return this.$store.state.pages.domains
        },
        availableDomains() {
            return this.allDomains.filter(domain => {
                if (domain.domain_name.startsWith('webmail') /*|| domain.domain_isssl === 0*/) return false
                return !this.domains.some(item => item.domain_id === domain.domain_id)
            })
        },
    },
    methods: {
        async onActionLink() {
            const value = await this.$refs.modal.show()
            if (!value) return false

            let domain = {...value}

            if (domain.subdomainValue) {
                domain = {
                    domain_id: -this.genID(),
                    domain_name: value.subdomainValue + '.' + value.subdomainParent.domain_name
                }
            }
            domain.domain_isdefault = this.domains.length === 0 ? 1 : 0
            this.$emit('change', [...this.domains, domain])
        },

        onActionUnlink(domain) {
            const domains = this.domains.filter(d => d.domain_id !== domain.domain_id);
            this.$emit('change', domains)
        },

        onActionDefault(domain) {
            const domains = this.domains.map(item => {
                item.domain_isdefault = item.domain_id === domain.domain_id ? 1 : 0
                return item
            })
            this.$emit('change', domains)
        },
    }
}
</script>

<style scoped lang="scss">
.domain-list {
    &__actions {
        display: none;
    }

    .list-group-item {
        max-width: 500px;
        padding: 0.0rem 0.45rem;
        min-height: 37px;

        &:hover {
            .domain-list__actions {
                display: flex;
            }
        }
    }
}
</style>
