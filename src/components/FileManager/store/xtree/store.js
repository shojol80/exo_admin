import mutations from './mutations';
import getters from './getters';
import actions from './actions';

export default {
    namespaced: true,
    state() {
        return {
            /**
             * directories.id (int), el id
             * directories.basename                       (string), folder name
             * directories.dirname                        (string) directory name
             * directories.path                           (string), path to directory
             * directories.props                          (object), directory properties
             * directories.parentId                       (int), parent id
             * directories.directories                       (array), children
             */
            directories: [],
        };
    },
    mutations,
    getters,
    actions,
};
