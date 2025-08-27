<template>
    <action-button
        :title="title"
        :disabled="disabled"
        :icon="$icons.external_link"
        @action="open">
    </action-button>
</template>

<script>
import isEmpty from '@modules/isEmpty'
import openWinTab from '@/shared/openWinTab'
import {resolvePermalink} from "@/shared/resolvePermalink";

export default {
    name: "OpenLink",
    props: {
        link: {
            type: String,
        },
        react_id: {},
        title: {
            type: String,
            default: 'Open link in a new tab'
        },
        container: {
            type: String
        }
    },
    computed: {
        disabled() {
            return isEmpty(this.link) && isEmpty(this.react_id)
        }
    },
    methods: {
        async open(e) {
            e.preventDefault()
            let url
            if (this.link) {
                url = this.link
            } else if (this.react_id) {
                url = await resolvePermalink(this.react_id, {
                    container: this.container,
                    resolve_holder_form: !!this.container
                })
            }
            openWinTab(url)
        }
    },
}
</script>

<style scoped>

</style>
