type Callback = () => void;

export class Event {
    events: {
        [key: string]: Callback[]
    } = {};

    on = (eventName: string, callback: Callback): void => {
        const eventHandlers = this.events?.[eventName] || [];
        eventHandlers.push(callback);
        this.events[eventName] = eventHandlers;
    }

    trigger = (eventName: string): void => {
        const eventHandlers = this?.events?.[eventName] || [];

        eventHandlers.forEach((event) => {
            event();
        })
    }
}
