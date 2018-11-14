import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { DataSourceService } from '@app/services/data-source';
import { QueryService } from '@app/services/query/query';

@Component({
	selector: 'query-schema',
	templateUrl: 'schema.html'
})

export class QuerySchema {
	@Input() schema: any;
    @Input() 
    set dataSources(dataSources: any) {
        if (dataSources) {
			dataSources.forEach( (ds) => {
				ds.text = ds.name;
			});

	        this._dataSources = dataSources;
	        this.getSelectedDS();
        }
    }
    @Input() 
    set query(q: any) {
    	if (q) {
	   		this._query = q;
    	}
    }

    @Input() 
    set dsID(id: any) {
    	if (id) {
    		this.selected_ds_id = id;
    		this.getSelectedDS();
    	}
    }

	@Output() onDSChange: EventEmitter<any> = new EventEmitter<any>();
	@Output() onDSRefresh: EventEmitter<any> = new EventEmitter<any>();
	@Output() onDescriptionChanged: EventEmitter<any> = new EventEmitter<any>();

	sourceMode: boolean = true;
	canEdit: boolean = true;
	_dataSources: any = [];
	_query: any;
	selected_ds_id: any;
	selected_ds: any = [];
	

	constructor() {

	}

	ngOnInit() {
	}

	refreshSchema() {
		this.onDSRefresh.emit(this.selected_ds_id);
	}

	getSelectedDS() {
		if (this._dataSources && this.selected_ds_id) {
			let that = this;
			this._dataSources.forEach(function(ds) {
    			if (ds.id === that.selected_ds_id) {
    				that.selected_ds = [];
    				that.selected_ds.push(ds);
    			}
    		});
		}
	}

	onSourceChange(ds) {
		if (ds && ds.id) {
			this.selected_ds_id = ds.id;
			this.onDSChange.emit(ds.id);	
		}
	}

	saveDescription(desc) {
		this._query.description = desc;
		this.onDescriptionChanged.emit(desc);
	}
}
