export default {
    methods:{
        xListeners(exclude){
            const listeners = {}
            for( let[key, value] of Object.entries(this.$listeners)) {
                if (!exclude.includes(key)) {
                    listeners[key] = value
                }
            }
            return listeners
        }
    }
}
