const operatorsQuery = {
    '=': 'is EQUAL',
    '!=': 'is NOT EQUAL',
    'empty': 'is EMPTY',
    '!empty': 'is NOT EMPTY',
    'changed': 'is CHANGED'
}
export default function ruleToQuery({rule_if, rule_operator}) {

    if (!rule_if) rule_if = []

    const children = rule_if.reduce((children, item) => {
        if (item.rule_if) {
            children.push({
                type: 'query-builder-group',
                query: ruleToQuery({rule_if: item.rule_if, rule_operator: item.rule_operator})
            })
        } else {
            if (item.field_name === '__react') {
                children.push({
                    type: 'query-builder-rule',
                    query: {
                        operand: "REACT",
                        operator: undefined,
                        rule: item.field_name,
                        value: item.exp
                    }
                })

            } else {
                children.push({
                    type: 'query-builder-rule',
                    query: {
                        operand: item.field_name,
                        operator: operatorsQuery[item.exp] || item.exp,
                        rule: '__' + item.field_name,
                        value: item.field_value
                    }
                })
            }
        }

        return children
    }, [])
    //type:"query-builder-group"
    return {logicalOperator: rule_operator, children}
}