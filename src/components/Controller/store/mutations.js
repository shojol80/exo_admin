import mapItemsTree from "@modules/utils/mapItemsTree";

export default {
    setContainer(state, container) {
        state.container = container;
    },

    setExtraParams(state, extraParams) {
        state.extraParams = extraParams;
    },

    setItemsTree(state, itemsTree) {
        //add $int_id
        let id = 1
        let itemsTreeInt = mapItemsTree(itemsTree, item => ({
                $int_id: id++,
                ...item
            })
        )
        state.itemsTree = itemsTreeInt
    },

    sortItems(state, {dir, key}) {
        let items = state.itemsTree.sort((a, b) => {
            if (a.react[key] < b.react[key]) return dir === 'asc' ? -1 : 1;
            if (a.react[key] > b.react[key]) return dir === 'asc' ? 1 : -1;
            return 0;
        })
        state.itemsTree = items
    },
};

