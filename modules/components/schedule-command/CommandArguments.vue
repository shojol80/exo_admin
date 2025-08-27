<template>
    <div>
        <template v-for="argument in commandObject.arguments">
            <div class="row">
                <div class="col-8 form-group">
                    <label>{{ argument.name }}</label>
                    <input v-if="localValue && localValue[argument.name]"
                           type="text" class="form-control"
                           :name="`params[${argument.name}][value]`"
                           v-model="localValue[argument.name].value"
                           :required="argument.required">
                </div>
                <div class="col-4 form-group">
                    <label>Data type</label>

                    <select :name="`params[${argument.name}][type]`"
                            v-model="localValue[argument.name].type"
                            class="form-control"
                    >
                        <option value="string">String</option>
                        <option value="function"
                                :selected="(arguments && arguments.hasOwnProperty(argument.name) ? arguments[argument.name].type : '') === 'function'">
                            Function
                        </option>
                    </select>
                </div>
            </div>
        </template>
    </div>

</template>
<script>

import isEmpty from "@modules/isEmpty";

export default {
    name: 'CommandArguments',
    props: {
        commandObject: {},
        value: {}
    },
    data() {
        return {
            localValue: {}
        }
    },
    watch: {
        value: {
            immediate: true,
            handler() {
                if (_.isEqual(this.localValue, this.value)) return
                this.localValue = _.cloneDeep(this.value)
            }
        },
        localValue: {
            deep: true,
            handler() {
                if (isEmpty(this.localValue)) return
                this.$emit('input', this.localValue)
            }
        }
    },
}
</script>
