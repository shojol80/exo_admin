import {extractError} from "@/services/api";
import {app} from "@/main"
//import * as Sentry from "@sentry/vue";

export default function (err, {silent = false} = {}) {
    console.error(err)
    if (!silent) {
        app.$awn.alert(extractError(err))
    }
    //Sentry.setContext('response', err.response)
    //Sentry.setContext('user', app.$config('user', 'guest'))
    //Sentry.setContext('request', err.request)
    //Sentry.setContext('message', extractError(err))
    //Sentry.captureException(err);
}
