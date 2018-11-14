import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { DataSourceService } from '@app/services/data-source';
import { QueryService } from '@app/services/query/query';

@Component({
	selector: 'query-new',
	templateUrl: 'query-new.html'
})

export class NewQuery {
	canCreateQuery: true;
	query: any;
	dataSources: any;
	schema: any;
	rows: any ;
	columns: any;

	constructor(public ds: DataSourceService,
				private router: Router,
				private activRoute: ActivatedRoute,
				public qs: QueryService,
				private modalService: NgbModal,
				private toastr: ToastrService) {

		this.query = qs;

		this.activRoute.params.subscribe( params => {
			this.query.id = params.id;
		});
	}

	ngOnInit() {
		if (this.query.id) {
			this.qs.get().subscribe((resp) => {
				console.log(resp);
				Object.assign(this.query, resp);
				
				if (resp.latest_query_data_id) 
					this.getQueryResult();
				else
					this.executeQuery(null);
			});
		}

		this.ds.getAllDataSources().subscribe((resp) => {
			this.dataSources = resp;

			if (this.dataSources.length > 0) {

				if (!this.query.id)
					this.query.data_source_id = this.dataSources[0].id; 
				// else
				this.getSchema(this.query.data_source_id);
			
			}
		}, (err) => {
			this.toastr.error('Unable to fetch all data sources ' + err);
		});	
	}

	onDataSourceChange(dsId) {
		this.query.data_source_id = dsId;
		this.getSchema(dsId, false);
	}

	onDataSourceRefresh(dsId) {
		this.getSchema(this.query.data_source_id, true);
	}

	getSchema(dsId, refresh = false) {
		if (dsId) {
			this.ds.getSchema(dsId, refresh).subscribe((resp) => {
				this.schema = resp.schema;

			}, (err) => {
				this.toastr.error('Unable to fetch schema details ' + err);
			});
		}
	}

	getQueryResult() {
		this.query.getQueryResult(10000).subscribe((resp) => {
			console.log(resp);
			this.query.queryResult = resp;
			this.query.queryResult.status = "done";

			this.rows = this.query.queryResult.getData();
			
			let cols = this.query.queryResult.getColumns();
			cols.forEach( (col) => {
				col.prop = col.name;
			});

			this.columns = cols; //this.query.queryResult.getColumns();
			
		}, (err) => {
			this.toastr.error('Unable to get results for the query ' + err);
			console.log("Unable to get results for the query", err);
		});
	}

	refreshSchema() {
		return true;
	}

	executeQuery($event) {
		// this.query.queryResult = {};
		// this.query.queryResult.status = "processing";

		let ret = this.query.getQueryResult(0).subscribe((resp) => {
			this.query.queryResult = resp;
			this.query.queryResult.status = "done";

			this.rows = this.query.queryResult.getData();
			
			let cols = this.query.queryResult.getColumns();
			cols.forEach( (col) => {
				col.prop = col.name;
			});

			this.columns = cols;
			this.toastr.error('Query successfully run');
			
		}, (err) => {
			this.toastr.error('Unable to execute the query ' + err);
		});
	}	

	saveQuery($event) {
		if (!this.query.id)
			this.createNewQuery();
		else 
			this.updateQuery();
	}

	saveQueryName(name) {
		this.query.name = name;
		
		if (this.query.id)
			this.updateQuery();
	}

	setQueryAsFav() {
		if (this.query.is_favorite) {

			this.query.favorite().subscribe((resp) => {
				this.toastr.success('Query marked as favorite');

			}, (err) => {
				this.toastr.error('Could not mark the query as favorite ' + err);
			});	
		} else {
			this.query.unfavorite().subscribe((resp) => {
				this.toastr.success('Query removed as favorite');

			}, (err) => {
				this.toastr.error('Could not remove the query from favorites ' + err);
			});
		}
	}

	createNewQuery() {
		let ret = this.query.save().subscribe((resp) => {

			this.router.navigate(["/queries/" + resp.id]);
			
		}, (err) => {
			this.toastr.error('There was an error saving the query: ' + err);
		});
	}

	updateQuery() {
		let ret = this.query.update().subscribe((resp) => {
			console.log("Query successfully updated");
			this.toastr.success('Query successfully updated!');
			
		}, (err) => {
			this.toastr.error('There was an error updating the query: ' + err);
		});
	}

	openVisualizationEditor() {
		
		if (!this.query.id) {
			this.toastr.error('Please save the query first');
			return;
		}


		this.router.navigate(["/queries/" + this.query.id + "/charts"]);
	}
}
