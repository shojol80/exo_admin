function findParent($component, componentNames) {
    if (componentNames.includes($component.$options.name)) {
        return $component
    }
    if ($component.$parent) return findParent($component.$parent, componentNames)
    else return null
}

export default {
    methods: {
        $componentEmit(componentNames, event, payload) {
            let $component = findParent(this, componentNames)
            if ($component) {
                return $component.$emit(event, payload)
            }
        }
    },
}
