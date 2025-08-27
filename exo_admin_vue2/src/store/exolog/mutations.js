
export default {
    setConfig (state, params) {
        state.defaults = params.defaults
        state.constants = params.constants
        state.app = params.app
    }
}
