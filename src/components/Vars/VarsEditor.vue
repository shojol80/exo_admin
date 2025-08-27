<template>
    <div class="vars-editor">
        <div class="key-value">
            <div class="key-value__key">
                <h6 class="mb-0 text-primary">Name</h6>
            </div>

            <div class="key-value__value">
                <h6 class="mb-0 text-primary">Value</h6>
            </div>
        </div>
        <var-row v-for="cvar in varsIntUndeleted" :key="cvar.$int_id"
                 :id="cvar.$int_id"
                 :name="cvar.var_name"
                 :value="cvar.var_value"
                 :readonly="cvar.$ECO.front ? cvar.$ECO.front.readonly : false"
                 :title="cvar.$ECO.description"
                 @delete="onDelete"
                 @update="onUpdate">
        </var-row>
        <action-group>
            <action-button title="Add variable" :icon="$icons.add" @action="onAdd">
            </action-button>
        </action-group>
    </div>
</template>

<script>

import VarRow from "./VarRow"

export default {
    name: "VarsEditor",
    model: {
        prop: 'vars',
        event: 'change'
    },
    components: {VarRow},
    props: {
        vars: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {
            id: 0,
            varsInt: []
        }
    },
    watch: {
        vars(newval) {
            this.varsInt = newval.map(item => {
                item.$int_id = item.var_id === 'new' ? item.$int_id : item.var_id
                item.$ECO = this.$getECO(`variables.${item.var_type}.${item.var_name}`, {})
                return item
            })
        }
    },
    computed: {
        varsIntUndeleted() {
            return this.varsInt.filter(item => item.$_deleted !== 1)
        }
    },
    methods: {

        genId() {
            return --this.id
        },

        onDelete(id) {
            let idx = this.varsInt.findIndex(item => item.$int_id === id);
            if (this.varsInt[idx].$int_id < 0) {
                this.varsInt.splice(idx, 1);
            } else {
                this.varsInt[idx].$_deleted = 1
            }
            this.$emit('change', this.varsInt)

        },
        onUpdate(id, name, value) {
            let idx = this.varsInt.findIndex(item => item.$int_id === id)
            this.varsInt[idx].var_name = name
            this.varsInt[idx].var_value = value
            this.$emit('change', this.varsInt)
        },

        onAdd() {
            this.varsInt.push(
                {
                    $int_id: this.genId(),
                    $ECO: {},
                    var_id: 'new',
                    var_name: '',
                    var_value: ''
                })
        }
    }
}
</script>
<style lang="scss">

</style>
