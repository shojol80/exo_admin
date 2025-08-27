import FileManager from './FileManager.vue';

/**
 * Install
 *
 * @param app
 * @param options
 */
export default function install(app, options = {}) {
    if (!options.store) console.error('Please provide a store!!');

    app.component('file-manager', FileManager);

    //todo make it dynamic for each instance
    //options.store.registerModule('fm', store);
}
