import { View } from "./View";
import { User, UserPropTypes } from "../models/User";

interface EventMapType {
    [key: string]: () => void;
}

interface CompositionType {
    [key: string]: () => void;
}

export class UserForm extends View<User, UserPropTypes> {
    public eventsMapping: EventMapType = {};
    public componentComposition: CompositionType = {};

    eventsMap() {
        this.model.getState('age');
        return this.eventsMapping;
    }

    getEventsMap(): EventMapType {
        this.eventsMapping = {
            'click:h1': () => { console.log('h1 was clicked') }
        };
        return this.eventsMapping;
    }

    template(): string {
        return `
            <div>
                <h1>User Form</h1>
                <input/>
            </div>
        `;
    }

    bindEventHandlers(fragmentRef: DocumentFragment) {
        if (!Object.keys(this.eventsMapping)) return;

        for (const [eventMeta, callback] of Object.entries(this.getEventsMap())) {
            const [event, selector] = eventMeta.split(':');
            fragmentRef.querySelectorAll(selector).forEach((el) => {
                el.addEventListener(event, callback);
            })
        }
    }

    render(): void {
        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template() || '';
        this.bindEventHandlers(templateElement.content);
        this.parent.append(templateElement.content);
    }
}