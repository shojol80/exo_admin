import { createApp } from 'vue';

// EventBus for Vue 3
const EventBus = createApp({}).config.globalProperties;

// Alternative simple event emitter
class SimpleEventBus {
  constructor() {
    this.events = {};
  }

  $on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  $emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(...args));
    }
  }

  $off(event, callback) {
    if (this.events[event]) {
      if (callback) {
        this.events[event] = this.events[event].filter(cb => cb !== callback);
      } else {
        delete this.events[event];
      }
    }
  }
}

export default new SimpleEventBus();
