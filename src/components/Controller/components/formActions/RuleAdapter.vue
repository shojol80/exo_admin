<template>
    <x-query-builder
        v-bind="$attrs"
        v-model="query">
    </x-query-builder>
</template>

<script>
import XQueryBuilder from '@/components/XQueryBuilder/XQueryBuilder'
import {isEqual} from 'lodash'
import ruleToQuery from "@modules/utils/ruleToQuery";
import queryToRule from "@modules/utils/queryToRule";

export default {
    name: "RuleAdapter",
    components: {XQueryBuilder},
    model: {
        prop: 'rule_if',
        event: 'input'
    },
    props: {
        rule_if: {
            type: Array,
            required: true,
            default() {
                return []
            }
        },
        rule_operator: {
            type: String,
            required: true,
            default: 'any'
        }
    },
    data() {
        return {
            query: {
                children: null,
                logicalOperator: null
            },
        }
    },
    watch: {
        rule_if: {
            deep: true,
            immediate: true,
            handler() {
                const query = ruleToQuery({rule_if: this.rule_if, rule_operator: this.rule_operator})
                this.query.children = query.children
            }
        },
        rule_operator: {
            immediate: true,
            handler() {
                this.query.logicalOperator = this.rule_operator
            }
        },
        query() {
            let rule_if = queryToRule(this.query)
            if (!isEqual(rule_if, this.rule_if)) this.$emit('input', rule_if)

            if (this.rule_operator !== this.query.logicalOperator) {
                this.$emit('update:rule_operator', this.query.logicalOperator)
            }
        }
    },
}
</script>

<style scoped>

</style>
