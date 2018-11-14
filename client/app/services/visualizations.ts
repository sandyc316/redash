
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Api } from './api';

@Injectable()
export class VisualizationService {
    id: any;
    name: string;
    type: string;
    options: any = {};

    constructor(public api: Api) {
        
    }

    get(vizId) {
        return this.api.doGet('api/visualizations/' + vizId);
    }

    save(name, description, type, qId, options) {
        return this.api.doPost('api/visualizations' , {
            name: name,
            options: options,
            type: type,
            query_id: qId,
            description: description
        }).pipe(map(res => JSON.parse(res["_body"])));
    }

    addToDashboard(dashboardId, visualizationId, options) {
        return this.api.doPost('api/widgets' , {
            dashboard_id: dashboardId,
            options: options,
            visualization_id: visualizationId,
            text: "",
            width: 1
        }).pipe(map(res => JSON.parse(res["_body"])));
    }

    update(vizId, name, type, options) {
        return this.api.doPost('api/visualizations/' + vizId , {
            name: this.name,
            options: this.options,
            type: this.type
        }).pipe(map(res => JSON.parse(res["_body"])));
    }

    query() {
        return this.api.doGet('api/visualizations/types');
    }

    delete(id) {
        return this.api.doDelete('api/visualizations/' + id).pipe(map(res => JSON.parse(res["_body"])));
    }
}
