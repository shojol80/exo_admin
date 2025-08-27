const operatorsRule = {
    'is EQUAL': '=',
    'is NOT EQUAL': '!=',
    'is EMPTY': 'empty',
    'is NOT EMPTY': '!empty',
    'is CHANGED': 'changed'
}

export default function queryToRule(query) {
    return query.children.reduce((rule_if, item) => {
        if (item.type === 'query-builder-group') {
            rule_if.push({
                "rule_if": queryToRule(item.query),
                "rule_operator": item.query.logicalOperator
            })
        } else {
            if (item.query.rule === '__react') {
                rule_if.push({
                    field_name: item.query.rule,
                    field_value: '',
                    exp: item.query.value
                })
            } else {
                rule_if.push({
                    field_name: item.query.operand,
                    field_value: item.query.value,
                    exp: operatorsRule[item.query.operator] || item.query.operator,
                })
            }
        }

        return rule_if
    }, [])
}