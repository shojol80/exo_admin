import arrayToTree from "@modules/utils/arrayToTree";

export default {
    usergroupsTree: state => {
        return arrayToTree(state.usergroups, 'ug_id', 'ug_parent', 'ug_children');
    }
}
