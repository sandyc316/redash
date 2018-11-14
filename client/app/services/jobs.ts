
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Api } from './api';

@Injectable()
export class JobService {
    id: any;
    name: string;
    type: string;
    options: any = {};

    constructor(public api: Api) {
        api.setEndpoint("Parser");
    }

    get(jobsId) {
        return this.api.doGet('jobs/' + jobsId);
    }

    getAll() {
        return this.api.doGet('jobs');
    }

    save(name) {
        return this.api.doPost('api/dashboards' , {
            name: name
        }).pipe(map(res => JSON.parse(res["_body"])));
    }

    update() {
        return this.api.doPost('api/dashboards/' + this.id , {
            name: this.name,
            options: this.options,
            type: this.type
        }).pipe(map(res => JSON.parse(res["_body"])));
    }

    removeWidget(id) {
        return this.api.doDelete('api/widgets/' + id).pipe(map(res => JSON.parse(res["_body"])));
    }
}
