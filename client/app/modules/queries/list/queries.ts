import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { Component } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DataSourceService } from '@app/services/data-source';
import { QueryService } from '@app/services/query/query';


@Component({
	selector: 'page-queries-list',
	templateUrl: 'queries.html'
})

export class QueriesList {
	query: any;
	loaded: boolean = false;
	showEmptyState: boolean = true;
	term: string = "";
	pageSize: number = 20;
	showMyQueries: boolean = true;
	queryRows: any = []
	dataFetched: boolean = false;
	displayedColumns: string[] = ['name', 'created_at', 'runtime', 'retrieved_at'];

	constructor(public ds: DataSourceService,
				private router: Router,
				private activRoute: ActivatedRoute,
				public qs: QueryService,
				private modalService: NgbModal) {
				
		this.query = qs;
	}

	ngOnInit() {
		if (this.query) {
			let that = this;
			this.qs.getAll().subscribe((resp) => {
				console.log(resp);
				resp.results.forEach(function(query) {
					that.queryRows.push({
						"id": query.id,
						"name": query.name,
						"created_at": query.created_at,
						"runtime": query.runtime > 1 ? query.runtime : 1,
						'retrieved_at': query.retrieved_at
					});
				});

				this.dataFetched = true;
			});
		}
	}

	update(){
		console.log("Update called");
	}
}
