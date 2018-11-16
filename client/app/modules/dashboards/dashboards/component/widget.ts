import { Component , Input, Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { QueryService } from '@app/services/query/query';


@Component({
	selector: 'dashboard-widget',
	templateUrl: 'widget.html',
})

export class DashboardWidget {
	@Input() 
	set widget(widget) {
		if (widget) {
			this._widget = widget;
			if (widget.visualization) {
				Object.assign(this.qs, widget.visualization.query);
				this.type = widget.visualization.type;
				this.getQueryResult();
			}
		}
	}

	@Output() removeWidget: EventEmitter<any> = new EventEmitter<any>();

  	queryResult: any;
  	rows: any = [];
  	columns: any = [];
  	type: string = "Chart";
  	_widget: any;
  	showSpinner: boolean = true;

	constructor(private qs: QueryService) {
		
		
	}

	getQueryResult() {
		this.qs.getQueryResult(10000).subscribe((resp) => {
			this.qs.queryResult = resp;
			this.qs.queryResult.status = "done";

			this.showSpinner = false;

			this.rows = this.qs.queryResult.getData();
			
			let cols = this.qs.queryResult.getColumns();
			cols.forEach( (col) => {
				col.prop = col.name;
			});

			this.columns = cols; //this.qs.queryResult.getColumns();
			
		}, (err) => {
			console.log("Unable to get results for the query", err);
		});
	}

	deleteWidget(id) {
		this.removeWidget.emit(id);
	}
}

