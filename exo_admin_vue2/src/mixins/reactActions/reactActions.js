import {R_REACT_EDIT} from '@/router/routs'
import reacts from '@/services/api/reacts'
import PromptNewReactDialog from '@/components/dialogs/PromptNewReactDialog'
import {resolvePermalink} from "@/shared/resolvePermalink";
import openWinTab from "@/shared/openWinTab";

export default {
    methods: {
        reactEdit(rows) {
            this.$router.push({
                name: R_REACT_EDIT,
                params: {
                    react_id: rows[0].react_id,
                },
            })
        },
        async reactBrowse(rows, options = {}) {
            const permalink = await resolvePermalink(rows[0].react_id, options)
            if (permalink) {
                await openWinTab(permalink);
            }
        },
        reactClone(rows) {
            this.$awn.alert('Not implemented!')
        },
        async reactDelete(rows) {
            let ids, message
            if (rows.length === 1) {
                message = `Are you sure want to delete reaction "${rows[0]['react_title']}"?`
                ids = rows[0];
            } else {
                message = `Are you sure want to delete "${rows.length}" reactions?`
                ids = {react_id: rows.map(row => row['react_id'])}
            }
            const event = await this.$dialogs.confirmDelete({
                title: 'Delete reaction',
                message: message
            })
            if (event.trigger !== 'ok') return
            await reacts.deleteReact(ids)
            //todo remove this
            if (this.load) await this.load()
        },
        async reactNew(availableForms) {
            let event = await this.$dialogs.show(PromptNewReactDialog, {
                forms: availableForms
            })
            if (event.trigger !== 'ok' || !event.value) return
            this.$router.push({
                name: R_REACT_EDIT,
                params: {react_id: 'new'},
                query: event.value
            })
        },
    }
}
