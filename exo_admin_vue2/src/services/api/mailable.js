import Api from "@/services/api/Api"

export default {
    send({react_id, ug_id, email, fq_id, QBRules, date_scheduled,}, config) {
        return Api.post('/mailable/send', ...arguments)
    },
    estimatedRecipients({ug_id, email, fq_id, QBRules}, config) {
        return Api.post('/mailable/estimatedRecipients', ...arguments)
    }
}
