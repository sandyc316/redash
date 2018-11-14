// import moment from 'moment';

import { map } from 'rxjs/operators';
import { Observable, of } from "rxjs";

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {CurrentUser} from '../currentUser';
import {QueryResult} from './query-result';
import {QueryResultError} from './query-result-error';

import { Api } from '../api';

@Injectable()
export class QueryService {

    id: any;
    schedule: any = null;
    name: string = 'New query';
    description: string = "Add description";
    user: any;
    query: any;
    options: any = {};
    version: any;
    latest_query_data: any;
    latest_query_id: any;
    latest_query_data_id: any;
    data_source_id: any;
    queryResult: any;
    parameters: any = {
        get: function() {return [];} 
    };
    // is_favorite: boolean = false;
    // is_draft: boolean = false;
    // is_archived: boolean = false;

    constructor(
        public http: Http,
        public api: Api,
        private currentUser: CurrentUser) {

        this.user = currentUser;

    }

    get() {
        return this.api.doGet('api/queries/' + this.id, {});
    }

    getAll() {
        return this.api.doGet('api/queries', {   
            page_size: 20,
            page: 1,
            order: "-created_at"
        });
    }

    save() {
        return this.api.doPost('api/queries', {
            name: this.name,
            query: this.query,
            description: this.description,
            data_source_id: Number(this.data_source_id),
            schedule: null,
            options: {
                parameters: []
            }
        }).pipe(map(res => JSON.parse(res["_body"])));
    }

    update() {
        return this.api.doPost('api/queries/' + this.id, {
            query: this.query,
            name: this.name,
            description: this.description

        }).pipe(map(res => JSON.parse(res["_body"])));
    }

    recent() {
        return this.api.doGet('api/queries/recent', {});
    }

    myQueries() {
        return this.api.doGet('api/queries/my', {});
    }

    fork() {
        return this.api.doPost('api/queries/' + this.id + '/fork', {}).pipe(map(res => res["_body"]));
    }

    resultById() {
        return this.api.doGet('api/queries/' + this.id + '/results.json', {});
    }

    favorites() {
        return this.api.doGet('api/queries/favorites', {});
    }

    favorite() {
        return this.api.doPost('api/queries/' + this.id + '/favorite', {});
    }

    unfavorite() {
        return this.api.doDelete('api/queries/' + this.id + '/favorite');
    }

    format(syntax, query) {
        if (syntax === 'json') {
            
            // try {
            //     const formatted = JSON.stringify(JSON.parse(query), ' ', 4);
            //     return $q.resolve(formatted);
            // } catch (err) {
            //     return $q.reject(String(err));
            // }

        } else if (syntax === 'sql') {
            return this.api.doPost('api/queries/format', { query }).pipe(map(res => res["_body"]));

        } else {
            return of('Query formatting is not supported for your data source syntax.');
            // return $q.reject('Query formatting is not supported for your data source syntax.');
        }
    }

    getSourceLink() {
        return `/queries/${this.id}/source`;
    }

    isNew() {
        return this.id === undefined;
    }

    hasDailySchedule() {
        return this.schedule && this.schedule.match(/\d\d:\d\d/) !== null;
    }

    scheduleInLocalTime() {
        const parts = this.schedule.split(':');
        return parts;
        // return moment
        // .utc()
        // .hour(parts[0])
        // .minute(parts[1])
        // .local()
        // .format('HH:mm');
    }

    hasResult() {
        return !!(this.latest_query_data || this.latest_query_data_id);
    }

    paramsRequired() {
        return false;
        // return this.getParameters().isRequired();
    };

    getQueryResult(maxAge = 10000) {
        
        if (!this.query) {
            return of(new QueryResultError("Can't execute empty query."));
        }
        
        let queryText = this.query;

        if (this.latest_query_data && maxAge !== 0) {
            
            if (!this.queryResult) {
                this.queryResult = new QueryResult({
                    query_result: this.latest_query_data,
                }, this.api);
            }

        } else if (this.latest_query_data_id && maxAge !== 0) {

            if (!this.queryResult) {
                let qr = new QueryResult(null, this.api);
                return qr.getById(this.latest_query_data_id).pipe(map(function(resp) {
                    qr.update(resp);
                    
                    return qr;
                }));
            }

        } else if (this.data_source_id) {
            let qr = new QueryResult(null, this.api);
            
            return qr.get(this.data_source_id, queryText, maxAge, this.id).pipe(map(function(resp) {
                qr.update(resp);
                
                return qr;
            }));

        } else {
            return of(new QueryResultError('Please select data source to run this query.'));
        }

        return of(this.queryResult);
    };

    getUrl(source, hash) {
        let url = `queries/${this.id}`;

        if (source) {
            url += '/source';
        }

        let params = '';
        // if (this.getParameters().isRequired()) {
        //     this.getParameters().getValues().forEach(value, name) => {
            
        //         if (value === null) {
        //             return;
        //         }

        //         if (params !== '') {
        //             params += '&';
        //         }

        //         params += `p_${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
                
        //     }); 
        // }

        if (params !== '') {
            url += `?${params}`;
        }

        if (hash) {
            url += `#${hash}`;
        }

        return url;
    }

    getQueryResultPromise() {
        return this.getQueryResult().toPromise();
    }

    getParameters() {
    
        // if (!this.parameters) {
        //     this.parameters = new Parameters(this, $location.search());
        // }

        return this.parameters;
    }

    getParametersDefs() {
        return this.getParameters().get();
    }

}
