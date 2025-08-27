<template>
    <action-button
        @action="action"
        title="Open holder entity in new tab"
        :icon="$icons.open_holder">
    </action-button>
</template>

<script>

import {R_EDITION_EDIT, R_FORM_EDIT, R_REACT_EDIT, R_SITE_EDIT, R_USER_EDIT} from '@modules/routs'
import varsApi from '@/services/api/vars'

export default {
    name: "ActionOpenHolder",
    computed: {
        holderType() {
            return this.$store.getters['controller/getHolderType']
        },
        holderId() {
            return this.$store.getters['controller/getHolderId']
        },
        containerIdObject() {
            return this.$store.getters['controller/getContainerIdObject']
        }
    },
    methods: {
        //holderType          - react, var, unit,
        //holderId            - react_id, var_id, var_id|fq_name
        //holderKey           - only for unit
        //holderParentId      - only for unit react_id
        //holderParentType    - react, var
        async action() {
            let route
            switch (this.holderType) {
                case 'var':
                    route = await this.resolveVarConainer(this.holderId)
                    break
                case 'react':
                    route = {
                        name: R_REACT_EDIT,
                        params: {
                            react_id: this.holderId
                        }
                    }
                    break
                case 'unit':
                    switch (this.containerIdObject.holderParentType) {
                        case 'react':
                            route = {
                                name: R_REACT_EDIT,
                                params: {
                                    react_id: this.containerIdObject.holderParentId
                                }
                            }
                            break
                        case 'var':
                            route = await this.resolveVarConainer(this.holderId)
                            break
                        default:
                            this.$awn.alert(`Conatiner holder parent type "${this.containerIdObject.holderParentType}" is not supported`)

                    }
                    break
                default:
                    this.$awn.alert('Conatiner holder is not supported')
            }
            let routeData = this.$router.resolve(route);
            window.open(routeData.href, '_blank');
        },

        async resolveVarConainer(var_id) {
            let vars = await varsApi.getVars({var_id: var_id})
            if (vars[0]) {
                this.$awn.alert('Can`t find variable to resolve holder. id=' + var_id)
            }
            switch (vars[0].var_type) {
                case 'form':
                    return {
                        name: R_FORM_EDIT,
                        params: {
                            form_id: vars[0].var_parent,
                            group_id: 0
                        }
                    }
                case 'edition':
                    return {
                        name: R_EDITION_EDIT,
                        params: {
                            e_id: vars[0].var_parent
                        }
                    }

                case 'user':
                    return {
                        name: R_USER_EDIT,
                        params: {
                            u_id: vars[0].var_parent,
                            ug_id: 0
                        }
                    }
                case 'site':
                    return {
                        name: R_SITE_EDIT,
                        params: {
                            site_id: vars[0].var_parent
                        }
                    }
                default:
                    this.$awn.alert(`Variable type ${vars[0].var_type} is not supported.`)
            }
        }
    }
}
</script>
