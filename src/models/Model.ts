import { AxiosPromise, AxiosResponse } from '../../node_modules/axios/index';

interface withID {
    id?: number;
}

type Callback = () => void;

interface EventInterface {
    on: (eventName: string, callback: Callback) => void;
    trigger: (eventName: string) => void;
}

interface SyncInterface<T> {
    fetch: (id: number) => AxiosPromise;
    save: (data: T) => AxiosPromise;
}

interface AttributesInterface<T> {
    getState<K extends keyof T>(key: K): T[K];
    setState: (data: T) => void;
    getAll: () => T;
}

export class Model<T extends withID> {
    constructor(
        private attributes: AttributesInterface<T>,
        private events: EventInterface,
        private sync: SyncInterface<T>,
    ) { }

    getState = this.attributes.getState;

    on = this.events.on;

    trigger = this.events.trigger;

    set(updatedState: T) {
        this.attributes.setState(updatedState);
        this.trigger('change');
    }

    fetch() {
        const id = this.getState('id');

        if (typeof id !== 'number') {
            throw new Error('invalid id');
        }

        this.sync.fetch(id).then((res: AxiosResponse) => {
            this.set(res.data);
            console.log('res data: ', res.data);
        });
    }

    save() {
        const data = this.attributes.getAll();
        this.sync.save(data).then((res: AxiosResponse) => {
            this.trigger('save');
        }).catch(() => {
            this.trigger('error');
        })
    }
}