<template>
    <app-screen>
        <waiter ref="tableWaiter">
            <action-table :name="'Sites'"
                          ref="table"
                          :columns="columns"
                          :options="options"
                          v-model="sites"
                          class="sites-table">
                <!--Actions-->
                <template #beforeFilterWrapper>
                    <action-group class="">
                        <action-button
                            @action="toggleExportMode"
                            :title="exportMode ? 'Cancel Export' : 'Export Sites'"
                            :icon="exportMode ? $icons.close : $icons.export"
                            :variant="exportMode ? 'secondary' : 'primary'">
                            {{ exportMode ? 'Cancel' : '+ Export sites' }}
                        </action-button>
                    </action-group>
                </template>
                <template #actions="{rows}" v-if="exportMode">
                    <action-group>
                        <action-button
                            v-show="rows && rows.length > 0"
                            @action="exportSelected(rows)"
                            title="Export selected sites"
                            :icon="$icons.export"
                            variant="success">
                            Export selection ({{ rows.length }})
                        </action-button>
                        <action-group-separator></action-group-separator>
                        <action-button
                            @action="toggleExportMode"
                            title="Cancel export mode"
                            :icon="$icons.close"
                            variant="secondary">
                            Cancel
                        </action-button>
                    </action-group>
                </template>
                <template #actions="{rows}" v-else>
                    <action-group>
                        <action-button
                            @action="createSite"
                            title="Create new site"
                            :icon="$icons.add">
                            + Create site
                        </action-button>
                    </action-group>
                </template>
                <!--Columns-->
                <template #main_domain_name="{row}">
                    <a v-if="row.main_domain_name" 
                       :href="`https://${row.main_domain_name}`" 
                       target="_blank">
                        {{ row.main_domain_name }}
                    </a>
                    <span v-else class="text-muted">No domain</span>
                </template>
                <template #col-action="{row}">
                    <action-group @click.stop="void 0" v-if="!exportMode">
                        <action-button
                            @action="editSite(row)"
                            title="Edit site"
                            :icon="$icons.edit">
                        </action-button>
                        <action-button
                            @action="openAdminPanel(row)"
                            title="Open admin panel"
                            :icon="$icons.external">
                        </action-button>
                    </action-group>
                </template>
            </action-table>
        </waiter>
    </app-screen>
</template>

<script>
import sites from '@/services/api/sites'

export default {
    name: "SitesTable",
    components: {},
    props: {},
    data() {
        return {
            sites: [],
            exportMode: false,
            columns: [
                'site_id',
                'site_alias', 
                'site_name',
                'main_domain_name',
                'col-action'
            ],
            options: {
                filterable: true,
                sortable: [
                    'site_id',
                    'site_alias',
                    'site_name',
                    'main_domain_name'
                ],
                uniqueKey: 'site_id',
                headings: {
                    'site_id': 'ID',
                    'site_alias': 'Alias',
                    'site_name': 'Name', 
                    'main_domain_name': 'Host',
                },
                requestFunction: this.requestFunction,
            },
        }
    },
    computed: {
        exportColumns() {
            return [
                'col-check',
                'site_id',
                'site_alias',
                'site_name', 
                'main_domain_name'
            ];
        }
    },
    watch: {
        exportMode(newVal) {
            // Switch columns based on export mode
            this.columns = newVal ? this.exportColumns : [
                'site_id',
                'site_alias',
                'site_name',
                'main_domain_name', 
                'col-action'
            ];
        }
    },
    methods: {
        async requestFunction(params) {
            try {
                return await sites.all(params);
            } catch (error) {
                console.error('Error loading sites:', error);
                return { data: [], total: 0 };
            }
        },
        
        toggleExportMode() {
            this.exportMode = !this.exportMode;
            // Clear any selections when toggling
            if (this.$refs.table && this.$refs.table.clearSelection) {
                this.$refs.table.clearSelection();
            }
        },
        
        async exportSelected(selectedSites) {
            if (!selectedSites || selectedSites.length === 0) {
                this.$awn.warning('Please select at least one site to export');
                return;
            }
            
            try {
                const siteIds = selectedSites.map(site => site.site_id);
                
                this.$awn.info(`Exporting ${selectedSites.length} site(s)...`);
                
                // Call export API
                const response = await sites.export({ site_ids: siteIds });
                
                // The response should be a file download
                this.$awn.success(`Successfully exported ${selectedSites.length} site(s)`);
                
                // Exit export mode
                this.toggleExportMode();
                
            } catch (error) {
                console.error('Export error:', error);
                this.$awn.alert('Failed to export sites. Please try again.');
            }
        },
        
        createSite() {
            // TODO: Implement create site functionality
            this.$awn.info('Create site functionality not implemented yet');
        },
        
        editSite(site) {
            // TODO: Implement edit site functionality  
            this.$awn.info(`Edit site ${site.site_name} functionality not implemented yet`);
        },
        
        openAdminPanel(site) {
            const url = `/api/site-exo-admin/${site.site_id}`;
            window.open(url, '_blank');
        },
        
        load() {
            this.$refs.table.refresh();
        }
    },
    mounted() {
        this.load();
    }
}
</script>

<style lang="scss">
.sites-table {
    &__search {
        min-width: 250px;
    }
    
    .col-site_id {
        width: 80px;
    }
    
    .col-site_alias {
        width: 150px;
    }
    
    .col-site_name {
        max-width: 300px;
    }
    
    .col-main_domain_name {
        max-width: 250px;
    }
    
    .col-action {
        width: 120px;
    }
}
</style>
