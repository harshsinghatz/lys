export class Attributes<T> {
    constructor(private state: T) {

    }

    getState = <K extends keyof T>(propName: K): (T[K]) => {
        return this.state[propName];
    }

    getAll = (): T => {
        return this.state;
    }

    setState = (newState: T): void => {
        if (!Object.keys(newState)) return;

        Object.assign(this.state, newState);
    }
}