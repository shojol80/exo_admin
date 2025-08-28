import xListeners from "@/mixins/xListeners";

export default {
    mixins: [xListeners],
    model: {
        prop: "value",
        event: "input",
    },
    props: {
        id: [String, Number],
        title: String,
        dbField: String,
        description: String,
        name: {
            type: String,
            default: null,
        },
        value: null,
        valid: null,
        errors: {
            type: null,
            default() {
                return [];
            },
        },
        labelColsSm: {
            default: 3,
        },
        labelColsLg: {
            default: 2,
        },
    },
    methods: {
        inputState(errors, valid) {
            return errors[0] ? false : null;
        },
    },
    computed: {
        nameComputed() {
            return this.name || this.dbField;
        },
        idComputed() {
            if (this.id) return this.id;
            if (this.nameComputed) return this.nameComputed;
        },
    },
};
