
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Api } from './api';

@Injectable()
export class ProjectService {
    id: any;
    name: string;
    type: string;
    options: any = {};

    constructor(public api: Api) {
        api.setEndpoint("Parser");
    }

    get(jobsId) {
        return this.api.doGet('projects/' + jobsId);
    }

    getAll() {
        return this.api.doGet('projects');
    }

    scan() {
        return this.api.doGet('projects/scan');
    }

    processProject(id, reProcess = false) {
        return this.api.doPost('projects/' + id + '/process', {"reprocess": reProcess}).pipe(map(res => JSON.parse(res["_body"])));
    }

    cancelProject(id, reProcess = false) {
        return this.api.doPost('projects/' + id + '/cancel', {}).pipe(map(res => JSON.parse(res["_body"])));
    }
}
