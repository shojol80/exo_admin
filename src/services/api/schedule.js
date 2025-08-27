import Api from "@/services/api/Api"

export default {
    getSchedules(params, config) {
        return Api.post('/schedule/getSchedules', ...arguments)
    },
    saveSchedule(params, config) {
        return Api.post('/schedule/saveSchedule', ...arguments)
    },
    inactivate(params, config) {
        return Api.post('/schedule/inactivate', ...arguments)
    },
    activate(params, config) {
        return Api.post('/schedule/activate', ...arguments)
    },
    deleteSchedule(params, config) {
        return Api.post('/schedule/deleteSchedule', ...arguments)
    },
    getSchedule(params, config) {
        return Api.post('/schedule/getSchedule', ...arguments)
    },
    commands(params, config) {
        return Api.post('/schedule/commands', ...arguments)
    },
}
