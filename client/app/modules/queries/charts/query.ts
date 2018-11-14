import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { QueryService } from '@app/services/query/query';
import { VisualizationService } from '@app/services/visualizations';

@Component({
	selector: 'query-charts',
	templateUrl: 'query.html'
})

export class QueryCharts {
	query: any;
	rows: any = [];
	selX: any = [];
	selY: any = [];
	type: any;
	columns: any = [];
	name: string = "Enter a name for the chart";
	vizId: any;

	constructor(public qs: QueryService,
				public vs: VisualizationService,
				private router: Router,
				private activRoute: ActivatedRoute,
				private toastr: ToastrService) {
		
		this.query = qs;
		this.activRoute.params.subscribe( params => {
			this.query.id = params.id;
			
			if (params.options) {
				let options = JSON.parse(params.options);
				this.selX = options.xCol;
				this.selY = options.yCols;
				this.type = params.type;
				this.vizId = params.visId;
				this.name = params.name;	
			}
		});
	}

	ngOnInit() {
		if (this.query.id && !this.query.queryResult) {
			this.qs.get().subscribe((resp) => {
				Object.assign(this.query, resp);
				
				if (resp.latest_query_data_id) 
					this.getQueryResultById();
				else 
					this.fetchQueryResults();
			});
			
		} else {

			this.rows = this.query.queryResult.getData();
			let cols = this.query.queryResult.getColumns();
			cols.forEach( (col) => {
				col.prop = col.name;
			});

			this.columns = cols; 
			// this.columns = this.query.queryResult.getColumns();
		}
	}

	getQueryResultById() {
		this.query.getQueryResult(10000).subscribe((resp) => {
			this.query.queryResult = resp;
			this.query.queryResult.status = "done";

			this.rows = this.query.queryResult.getData();
			
			let cols = this.query.queryResult.getColumns();
			cols.forEach( (col) => {
				col.prop = col.name;
			});

			this.columns = cols; //this.query.queryResult.getColumns();
			
		}, (err) => {
			console.log("Unable to get results for the query", err);
		});
	}

	fetchQueryResults() {
		let ret = this.query.getQueryResult(0).subscribe((resp) => {
			this.query.queryResult = resp;
			this.query.queryResult.status = "done";

			this.rows = this.query.queryResult.getData();
			
			let cols = this.query.queryResult.getColumns();
			cols.forEach( (col) => {
				col.prop = col.name;
			});

			this.columns = cols;
			
		}, (err) => {
			console.log("Unable to fetch results for the query", err);
		});
	}	

	saveChart(data) {
		if (!this.vizId)
			this.vs.save(data.name, data.description, data.type, this.query.id, data.options).subscribe((resp) => {
				this.toastr.success('Chart successfully saved');
				this.vizId = resp.id;
			});
		else {
			this.vs.update(this.vizId, data.name, data.type, data.options).subscribe((resp) => {
				this.toastr.success('Chart successfully updated');
			});
		}
	}

	cancelChart($event) {
		console.log($event);
	}

	addToDashboard() {
		if(this.vizId) {
			// Create a widget in my dashboard
			let options = {}
			this.vs.addToDashboard(1, this.vizId, options).subscribe((resp) => {
				this.toastr.success('Chart successfully added to Dashboard');
				// this.vizId = resp.id;
			});
		}
	}
}
