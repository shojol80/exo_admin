export default class DialogEvent {
    constructor(dialog, trigger) {
        this.trigger = trigger || null
        this.target = dialog.$el || null
        this.vueTarget = dialog
    }
}