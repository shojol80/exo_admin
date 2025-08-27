/**
 * Vue mixin for generate internal ID
 */
let id = 1;
export default {
    methods: {
        genID() {
            return id++
        },
    },
}
