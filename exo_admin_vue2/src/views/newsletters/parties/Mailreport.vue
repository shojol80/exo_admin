<template>
    <aside-panel class="mailreport" ref="modal">
        <waiter>
            <div class="mailreport__body">
                <table class="table table-striped table-borderless table-sm">
                    <tr>
                        <th>Status</th>
                        <td
                            :class="{
                                'text-success': newsletter.rn_status === 'done'
                            }"
                        >
                            {{ newsletter.rn_status }}
                        </td>
                    </tr>
                    <tr>
                        <th>Subject</th>
                        <td>{{ newsletter.rn_subject }}</td>
                    </tr>
                    <tr>
                        <th>From</th>
                        <td>
                            {{ newsletter.rn_send_fromname }}<{{
                                newsletter.rn_send_from
                            }}>
                        </td>
                    </tr>
                    <tr>
                        <th>To </th>
                        <td>group:{{ newsletter.usergroup.ug_name }}</td>
                    </tr>
                    <tr>
                        <th>User</th>
                        <td>{{ newsletter.user.u_email }}</td>
                    </tr>
                    <tr>
                        <th>Send mails</th>
                        <td>
                            {{ newsletter.rn_count_mails }}
                            <span
                                v-if="+newsletter.rn_count_mails_error > 0"
                                class="text-error"
                                >errors:{{
                                    newsletter.rn_count_mails_error
                                }}</span
                            >
                        </td>
                    </tr>
                    <tr>
                        <th>Bounces</th>
                        <td>{{ newsletter.rn_count_bounces }}</td>
                    </tr>
                    <tr>
                        <th>Users that react</th>
                        <td>{{ newsletter.rn_count_click_users }}</td>
                    </tr>
                    <tr>
                        <th>Users total clicks</th>
                        <td>{{ newsletter.rn_count_clicks }}</td>
                    </tr>
                </table>

                <iframe
                    src="javascript:void(0);"
                    ref="iframe"
                    frameborder="0"
                ></iframe>
            </div>
        </waiter>
    </aside-panel>
</template>

<script>
import AsidePanel from "@/components/containers/components/AsidePanel";
import newsletters from "@/services/api/newsletters";

export default {
    name: "Mailreport",
    components: { AsidePanel },
    data() {
        return {
            newsletter: {
                user: {},
                usergroup: {}
            }
        };
    },
    methods: {
        async show(rn_id) {
            this.$refs.modal.show();
            this.newsletter = await newsletters.getNewsletter({ rn_id });
            this.$refs.iframe.contentWindow.document.open(
                "text/html",
                "replace"
            );
            this.$refs.iframe.contentWindow.document.write(
                this.newsletter.rn_mail_body
            ); // htmlCode is the variable you called newDocument
            this.$refs.iframe.contentWindow.document.close();
        }
    }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/vue-component";

.mailreport__body {
    margin-top: 1rem;
    height: calc(100vh - #{$action-toolbar-height} - 2rem);

    iframe {
        border: 1px solid $border-color;
        height: 100%;
        width: 100%;
    }

    table {
        th {
            width: 300px;
        }
    }
}

.mode-popup .aside-panel {
    .mailreport__body {
        height: calc(
            100vh - #{$action-toolbar-height} - #{$popup-header-height} - 2rem
        );
    }
}
</style>
