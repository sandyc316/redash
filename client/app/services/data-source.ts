
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Api } from './api';

export const SCHEMA_NOT_SUPPORTED = 1;
export const SCHEMA_LOAD_ERROR = 2;

@Injectable()
export class DataSourceService {
    id: any;
    name: string;
    type: string;
    options: any = {};

    constructor(public api: Api) {
        
    }

    getSchema(dataSourceId, refresh = false) {
        const params = {refresh: false};

        if (refresh) {
            params.refresh = true;
        }

        return this.api.doGet('api/data_sources/' + dataSourceId + '/schema', params);
    }

    get(dsId) {
        return this.api.doGet('api/data_sources/' + dsId);
    }

    save() {
        return this.api.doPost('api/data_sources' , {
            name: this.name,
            options: this.options,
            type: this.type
        }).pipe(map(res => JSON.parse(res["_body"])));
    }

    update() {
        return this.api.doPost('api/data_sources/' + this.id , {
            name: this.name,
            options: this.options,
            type: this.type
        }).pipe(map(res => JSON.parse(res["_body"])));
    }

    query() {
        return this.api.doGet('api/data_sources/types');
    }

    delete(dsId) {
        console.log(this.id);
        return this.api.doDelete('api/data_sources/' + this.id).pipe(map(res => JSON.parse(res["_body"])));
    }

    getAllDataSources() {
        return this.api.doGet('api/data_sources');
    }

    test(params) {
        return this.api.doPost('api/data_sources/' + this.id + '/test', {params})
                .pipe(map(res => JSON.parse(res["_body"])));
    }
}
