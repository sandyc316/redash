import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Api } from './api';

@Injectable()
export class EventService {
    JWTtoken: any;
    app: any;
    url: any;
    patientURL: string;
    events: any[] = [];

    constructor(public http: Http,
                public api: Api) {

        // super();
    }

    post() {
        const events = this.events;
        this.events = [];

        return null; //this.api.doPost('api/events', events).pipe(map(res => res["_body"]));
        // $http.post('api/events', events);
    }

    record(action, objectType, objectId, additionalProperties) {
        const event = {
            action,
            object_type: objectType,
            object_id: objectId,
            timestamp: Date.now() / 1000.0,
            screen_resolution: `${window.screen.width}x${window.screen.height}`
        };

        // Object.assign(event, additionalProperties);
        this.events.push(event);

        return this.post;
    };
}
