export default {
    computed: {
        options() {
            return this.fq.options/*.map(item => {
                return {
                    value: item.fqv_value,
                    text: item.fqv_displayvalue ? item.fqv_displayvalue : item.fqv_value
                }
            })*/
        }
    }
}
