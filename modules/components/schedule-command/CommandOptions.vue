<template>
    <div>
        <template v-for="option in commandObject.options.withValue">
            <div class="row">
                <div class="col-8 form-group">
                    <label>{{ option.name }}</label>
                    <input type="text" class="form-control"
                           :name="`options[${option.name}][value]`"
                           v-model="localValue[option.name].value"
                           :required="option.required">
                </div>
                <div class="col-4 form-group">
                    <label>Data type</label>
                    <select :name="`options[${option.name}][type]`"
                            class="form-control"
                            v-model="localValue[option.name].type">
                        <option value="string">String</option>
                        <option value="function">Function</option>
                    </select>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import isEmpty from "@modules/isEmpty";

export default {
    name: 'command-options',
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
