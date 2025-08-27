import isEmpty from "@modules/isEmpty";

export default {
    /**
     * Base URL
     * @param state
     * @returns {default.baseUrl|(function(*))|string|*|string|null}
     */
    baseUrl(state) {
        return state.baseUrl;
    },

    /**
     * Headers
     * @param state
     * @return {*}
     */
    headers(state) {
        return state.headers;
    },

    /**
     * Headers has Authorization
     * @param state
     * @return {boolean}
     */
    authHeader(state) {
        return Object.prototype.hasOwnProperty.call(state.headers, 'Authorization');
    },

    mode(state) {
        return state.mode;
    },

    rootPath(state) {
        return +state.folderBack === 1 ? (isEmpty(state.startFolder) ? null : state.startFolder) : null
    }
};
