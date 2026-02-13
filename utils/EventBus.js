export class EventBus {
    constructor() {
        this.events = {};
    }

    on(event, callback) {
        if (typeof event !== "string")
            throw new TypeError("Tipo de event não é string");

        if (typeof callback !== "function")
            throw new TypeError("Tipo de callback não é function");

        if (!this.events[event])
            this.events[event] = [];

        this.events[event].push(callback);
    }

    off(event, callback) {
        if (typeof event !== "string")
            throw new TypeError("Tipo de event não é string");

        if (typeof callback !== "function")
            throw new TypeError("Tipo de callback não é function");

        if (!this.events[event]) return;

        if (!callback) {
            delete this.events[event];
            return;
        }

        const index = this.events[event].indexOf(callback);

        if (index !== -1)
            this.events[event].splice(index, 1);

        if (this.events[event].length === 0)
            delete this.events[event];
    }

    emit(event, data) {
        if (!this.events[event]) return;

        const listeners = [...this.events[event]];

        for (const callback of listeners) {
            callback(data);
        }
    }
}
