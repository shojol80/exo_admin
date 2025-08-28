import HasSlots from "@modules/mixins/HasSlots";
import { replace } from "lodash";

export default {
    mixins: [HasSlots],
    props: {
        title: String,
        icon: {
            type: [Object, String],
            reqired: false,
        },
        size: {
            type: String,
            default: "md",
        },
        disabled: Boolean,
        shortkey: String,
        active: {
            type: Boolean,
            default: false,
        },
        variant: {
            type: String,
            default: "primary",
        },
    },
    computed: {
        btnClass() {
            return {
                "action-button": true,
                "action-button--text": this.hasDefaultSlot,
                "action-button--active": this.active,
                [`action-button--${this.variant}`]: true,
                [`action-button--${this.size}`]: true,
            };
        },
        titleWithShortkey() {
            //todo fix shortkey
            if (false && this.shortkey) {
                let keys = JSON.parse(replace(this.shortkey, /'/g, '"'));
                if (this.title) {
                    return this.title + " (" + keys.join("+") + ")";
                } else {
                    return keys.join("+");
                }
            } else {
                return this.title;
            }
        },
    },
    methods: {
        onAction(e) {
            if (this.disabled) return;
            this.$emit("action", e);
            this.$emit("click", e);
            // Vue 3 compatible blur
            if (e && e.target && typeof e.target.blur === "function") {
                e.target.blur();
            }
        },
    },
};
