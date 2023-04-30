import { Event } from './Events';
import axios, { AxiosResponse } from "../../node_modules/axios/index";

export class Collection<T, K> {
    public users: T[] = [];
    private events: Event = new Event();

    constructor(private rootUrl: string, private deserialize: (json: K) => T) { }

    get on() {
        console.log('this: ', this);
        return this.events.on;
    }

    get trigger() {
        return this.events.trigger;
    }

    fetch() {
        axios.get(this.rootUrl).then((res: AxiosResponse) => {
            res.data.forEach((item: K) => {
                console.log("inside of call")
                this.users.push(this.deserialize(item));
            })
            this.trigger('change');
            this.trigger('save');
        })
    }
}