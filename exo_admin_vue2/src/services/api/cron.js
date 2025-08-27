import Api from "@/services/api/Api"

export default {
    getTaskList(params, config) {
        return Api.post('/cron/getTaskList', ...arguments)
    },
    saveTask(params, config) {
        return Api.post('/cron/saveTask', ...arguments)
    },
    terminateTask(params, config) {
        return Api.post('/cron/terminateTask', ...arguments)
    },
}
