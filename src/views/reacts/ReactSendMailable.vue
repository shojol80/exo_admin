<template>
    <app-screen>
        <send-mailable :react_id="react_id">
            <template #before_actions>
                <action-button
                    title="Back"
                    :icon="$icons.back"
                    @action="close">
                </action-button>
            </template>
        </send-mailable>
    </app-screen>
</template>

<script>

import SendMailable from '@/components/SendMailable/SendMailable'
import exoEventBus from '@modules/exoEventBus'

export default {
    name: "ReactSendMailable",
    components: {SendMailable},
    props: {
        react_id: {
            type: [String, Number],
            required: true,
        },
    },
    methods: {
        close(){
            exoEventBus.$emit('exo-popup-header-close-outer', {}, 1);
        }
    }
}
</script>
