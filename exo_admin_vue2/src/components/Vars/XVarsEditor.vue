<template>
    <vars-editor
        v-model="modelVars">
    </vars-editor>
</template>

<script>

import VarsEditor from '@/components/Vars/VarsEditor'
import vars from '@/services/api/vars'
import isEmpty from "@modules/isEmpty";

export default {
    name: "XVarsEditor",
    components: {
        VarsEditor
    },
    model: {
        prop: 'vars',
        event: 'change'
    },

    props: {
        var_type: {
            type: String,
            required: true,
        },
        var_parent: {
            required: true,
        },
    },
    data() {
        return {
            modelVars: []
        }
    },
    methods: {
        new() {
            this.modelVars = [];
        },
        load(var_parent = null) {

            var_parent = var_parent || this.var_parent

            if (!this.var_parent) return

            return vars.getVars({
                var_parent: this.var_parent,
                var_type: this.var_type
            }).then(data => this.modelVars = data)
        },
        save(var_parent = null) {
            var_parent = var_parent || this.var_parent

            if (isEmpty(var_parent)) {
                this.$awn.alert('"var_parent" is not defined before save')
                throw Error('"var_parent" is not defined before save')
            }
            if (isEmpty(this.var_type)) {
                this.$awn.alert('"var_type" is not defined before save')
                throw Error('"var_type" is not defined before save')
            }

            this.modelVars.forEach(item => {
                if (item.var_id === 'new') {
                    item.var_parent = var_parent
                    item.var_type = this.var_type
                    item.var_alias = item.var_name
                }
            })
            return vars.saveVars(this.modelVars).then(this.load)
        },
    }
}
</script>

<style lang="scss">
.vars-editor {
    .list-group-item {
        border: none;
        padding: 0.45rem 0.45rem;
    }
}

</style>
