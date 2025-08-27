import Api from "@/services/api/Api";

export default {
    getNewsletters(params, config) {
        return Api.post("/newsletters/getNewsletters", ...arguments);
    },
    terminate(params, config) {
        return Api.post("/newsletters/terminate", ...arguments);
    },
    getNewsletter(params, config) {
        return Api.post("/newsletters/getNewsletter", ...arguments);
    }
};
