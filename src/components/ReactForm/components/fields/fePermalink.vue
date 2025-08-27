<template>
    <collapse-section class="fe-permalinks">
        <template #legend="{visible}">
            <span class="mr-2">{{ fq.label }} </span>
            <collapse-section-sub-title>
                <template v-if="!visible">
                    {{ primary_permalink && primary_permalink.p_url }}
                </template>
                <template v-else>
                    <field-info-icon :fq="fq"></field-info-icon>
                </template>
            </collapse-section-sub-title>
        </template>
        <permalinks-table :permalinks="permalinks">
            <template #actions="props">
                <action-group>
                    <action-button @action="add()"
                                   title="Add permalink"
                                   :icon="$icons.add">
                    </action-button>
                </action-group>
                <action-group class="actions-right" right>
                    <action-text>React primary permalink:</action-text>
                    <select-react-form-permalink></select-react-form-permalink>
                </action-group>
            </template>
            <template #p_type="{row}">
                <b-badge :variant="variants[row.p_type]">{{ row.p_type }}</b-badge>
            </template>
            <template #p_url="{row}">
                <!--TODO: revert resolvePermalink from server by react edition-->
                <a :href="row.p_url" target="_blank">{{ row.p_url }}</a>
            </template>
            <template #p_fp_id="{row}">
                <span class="text-muted"
                      v-b-tooltip.hover
                      :title="row.p_fp_id ">{{ form_permalinks[row.p_fp_id] }}
                </span>
            </template>
            <template #p_context="{row}">
                <a href="#" @click.prevent
                   v-b-tooltip.focus="JSON.stringify(row.p_context)">...</a>
            </template>
            <template #col-action="{row}">
                <action-group>
                    <btn-set-react-as-home v-if="row.p_type==='PRIMARY'" @change="setAsHome"></btn-set-react-as-home>
                    <action-button
                        v-if="row.p_type==='MANUAL' || row.p_type==='HISTORY'"
                        @action="remove(row)"
                        :icon="$icons.delete">
                    </action-button>
                </action-group>
            </template>
        </permalinks-table>
    </collapse-section>
</template>

<script>

import inputs from './mixins/inputs'
import CollapseSection from "@/components/ReactForm/components/CollapseSection.vue";
import CollapseSectionSubTitle from "@/components/ReactForm/components/CollapseSectionSubTitle.vue";
import PermalinksTable from "@/components/ReactForm/components/PermalinksTable.vue";
import SelectReactFormPermalink from "@/components/ReactForm/components/SelectReactFormPermalink.vue";
import BtnSetReactAsHome from "@/components/ReactForm/components/BtnSetReactAsHome.vue";
import ManualPermalinkDialog from "@/components/dialogs/ManualPermalinkDialog.vue";
import FieldInfoIcon from "@/components/ReactForm/components/FieldInfoIcon.vue";

export default {
    name: "fePermalink",
    mixins: [inputs],
    components: {
        FieldInfoIcon,
        BtnSetReactAsHome,
        SelectReactFormPermalink,
        PermalinksTable,
        CollapseSectionSubTitle,
        CollapseSection
    },

    computed: {
        variants() {
            return {
                'PRIMARY': 'primary',
                'ALTERNATE': 'secondary',
                'HISTORY': 'success',
                'MANUAL': 'warning'
            }
        },
        form_permalinks() {
            return this.$store.getters['forms/form_permalinks'].reduce((acc, item) => {
                acc[item.fp_id] = item.fp_uri
                return acc
            }, {})
        },
        permalinks() {
            return [...this.permalinks_primary, ...this.permalinks_alt, ...this.permalinks_hist, ...this.permalinks_manual]
        },
        permalinks_alt() {
            return this.value.filter(item => item.p_type === 'ALTERNATE')
        },
        permalinks_hist() {
            return this.value.filter(item => item.p_type === 'HISTORY')
        },
        permalinks_primary() {
            return this.value.filter(item => item.p_type === 'PRIMARY')
        },
        permalinks_manual() {
            return this.value.filter(item => item.p_type === 'MANUAL')
        },
        primary_permalink() {
            return this.value.find(item => item.p_type === 'PRIMARY')
        },
    },
    methods: {
        async add() {
            let response = await this.$dialogs.show(ManualPermalinkDialog)
            if (response.trigger !== 'ok') return
            this.changeValue([...this.value, {
                p_url: response.value.p_url,
                p_type: 'MANUAL',
                p_fp_id: null,
                p_redirect: response.value.p_redirect === 'NO' ? null : response.value.p_redirect,
                p_context: null,
            }])
        },
        remove(row) {
            this.changeValue(this.value.filter(item => {
                return !(item.p_url === row.p_url && item.p_type === row.p_type)
            }))
        },
        setAsHome() {
            this.$store.commit('reactForm/useAsHomepage', true);
            const newVal = this.value.map(item => {
                if (item.p_type === 'PRIMARY') {
                    item = {...item, p_url: '/'}
                }
                return item
            })
            this.changeValue(newVal)
        }
    }
}
</script>
<style lang="scss">
@import "src/assets/scss/vue-component";

.fe-permalinks {
    .collapse-section__body {
        padding: 0 1rem 1rem 1rem;
        background-color: $white;

        .table-responsive {
            margin-bottom: 0;
        }
    }

    .actions-right {
        .action-text {
            flex: 1 0 auto;
            margin-right: 0.5rem;
        }

        .x-select {
            min-width: 350px;
        }
    }
}
</style>

