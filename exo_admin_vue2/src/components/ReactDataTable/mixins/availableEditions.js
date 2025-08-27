import isEmpty from '@modules/isEmpty'

export default {
    computed: {
        availableEditionsFilter() {
            let storeEditions = this.$store.getters['pages/editions']
            if (isEmpty(storeEditions)) return []

            storeEditions = storeEditions.map(edition => {
                return {
                    id: edition.e_id,
                    text: edition.e_id + ' - ' + edition.e_title,
                }
            })
            return storeEditions
        },
    }
}
