import containerApi from "@/services/api/container";
import reacts from "@/services/api/reacts";

export async function resolvePermalink(react_id, {container, resolve_holder_form} = {}) {
    let queryParams = {}
    if (resolve_holder_form) {
        queryParams.form_id = await containerApi.getHolderForm({container});
    }
    let url = await reacts.getPermalink({react_id: react_id})
    if (Object.keys(queryParams).length) {
        url += '?' + new URLSearchParams(queryParams).toString()
    }
    return url
}
