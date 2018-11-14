
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Api } from './api';

@Injectable()
export class DashboardService {
    id: any;
    name: string;
    type: string;
    options: any = {};

    constructor(public api: Api) {
        
    }

    get(dashId) {
        return this.api.doGet('api/dashboards/' + dashId);
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
