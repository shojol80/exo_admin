import $ from 'jquery';

let bus = $({});
let exoEventBus = {
    /**
     * Listen for a custom event.
     * Events can be triggered by exoEventBus.$emit(Global object or requirejs module).
     * The callback will receive payload argument passed into these event-triggering methods.
     * */
    $on: function (event, fn) {
        bus.on(event, function (e) {
            let payload = Array.prototype.slice.call(arguments);
            payload.shift();
            fn.apply(this, payload)
        })
    },

    $once: function (event, fn) {
        bus.one(event, function (e) {
            let payload = Array.prototype.slice.call(arguments);
            payload.shift();
            fn.apply(this,payload)
        })
    },

    $off: function(event){
        bus.off(event)
    },

    /**
     * Trigger an event on the current instance.
     * Payload argument will be passed into the listener’s callback function.
     *
     * {string} event - event name
     * {any}    payload - param to source, array will be passed as separete arguments
     *                  $emit('event',['a','b','c'])  -> $on('event',function(event,a,b,c){})
     *                  see jQuery.trigger
     * {int}    level - How many parent window will get message.
     *                  This param affect only parent iframes,
     *                  all child iframes will get message anyway.
     *                  0 - only current window (Do not trriger event in parent)
     *                  1 - only direct parent will get message
     *                  2...
     *                  undefined -Default. All parents windows will get message
     * */
    $emit: function (event, payload, level) {
        if (import.meta.env.VITE_VUE_APP_DEBUG) {
        }
        console.log('ExoEventBus:', event, payload, bus, level, document)

        exoEventBus._$echo(event, payload, bus, level, 0)
    },

    _$broadcast: function (event, payload, sourceBus) {
        bus.trigger(event, payload)

        $('iframe').each(function (i, frame) {
            try {
                if (frame.contentWindow.exoEventBus) {
                    frame.contentWindow.exoEventBus._$broadcast(event, payload, sourceBus);
                }
            } catch (e) {

            }
        });
    },

    _$echo: function (event, payload, sourceBus, maxLevel, currentLevel) {

        if (parent && parent !== window && parent.exoEventBus &&
            (maxLevel === undefined || currentLevel < maxLevel)) {
            currentLevel++
            parent.exoEventBus._$echo(event, payload, sourceBus, maxLevel, currentLevel);
        } else {
            exoEventBus._$broadcast(event, payload, sourceBus);
        }
    }

}
window.exoEventBus = exoEventBus;

export default exoEventBus;
