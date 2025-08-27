import FileManager from './FileManager.vue';

/**
 * Install
 *
 * @param Vue
 * @param options
 */
export default function install(Vue, options = {}) {
    if (!options.store) console.error('Please provide a store!!');

    Vue.component('file-manager', FileManager);

    //todo make it dynamic for each instance
    //options.store.registerModule('fm', store);
}
