import axios, { AxiosPromise } from "../../node_modules/axios/index";

interface DataType {
    id?: number;
}

export class Sync<T extends DataType> {

    constructor(public rootUrl: string = 'http://localhost:3000/users/') {
    }

    fetch(id: number): AxiosPromise {
        return axios.get(`${this.rootUrl}${id}`);
    }

    save(data: T): AxiosPromise {
        if (data?.id) {
            return axios.put(`${this.rootUrl}${data?.id}`, data);
        } else {
            return axios.post(`${this.rootUrl}`, data);
        }
    }
}