import { Model } from "../models/Model";

interface EventMapType {
    [key: string]: () => void;
}

export abstract class View<T extends Model<K>, K> {
    public eventsMapping: EventMapType = {};
    constructor(public parent: Element, public model: T) {
        this.bindModel();
    };

    abstract eventsMap(): EventMapType;

    abstract template(): string;

    bindModel(): void {
        this.model.on('change', () => {
            this.render();
        })
    }

    bindEventHandlers(fragmentRef: DocumentFragment) {
        if (!Object.keys(this.eventsMapping)) return;

        for (const [eventMeta, callback] of Object.entries(this.eventsMap)) {
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