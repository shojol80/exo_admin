import isEmpty from "@modules/isEmpty";

export default function expandStyles(styles) {
    if (isEmpty(styles)) return [];
    return styles
        .map(item => {
            if (typeof item === "object") {
                return {items: [], ...item}
            }
            return {
                title: item,
                selected: true,
                items: [],
            }
        })
        .filter((item, i, arr) => {
            //findLastIndex fallback
            for (let k = arr.length - 1; k >= 0; k--) {
                if (arr[k].title === item.title && k === i) {
                    return true
                }
                if (arr[k].title === item.title && k !== i) {
                    return false
                }
            }
        })
}
