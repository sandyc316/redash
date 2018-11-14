import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { JobService } from '@app/services/jobs';

@Component({
	selector: 'new-job',
	templateUrl: 'new.html',
})

export class NewJob {
	loaded: boolean = false;
	showEmptyState: boolean = true;
	term: string = "";
	pageSize: number = 20;
	showMyQueries: boolean = true;
	jobRows: any = []
	dataFetched: boolean = true;
	displayedColumns: string[] = ['type', 'started_at', 'runtime', 'status', 'result'];

	constructor(private router: Router,
				private activRoute: ActivatedRoute,
				public js: JobService,
				private modalService: NgbModal) {
	}

	ngOnInit() {
		// if (this.query) {
		// 	let that = this;
		// 	this.qs.getAll().subscribe((resp) => {
		// 		console.log(resp);
		// 		resp.results.forEach(function(query) {
		// 			that.queryRows.push({
		// 				"id": query.id,
		// 				"name": query.name,
		// 				"created_at": query.created_at,
		// 				"runtime": query.runtime > 1 ? query.runtime : 1,
		// 				'retrieved_at': query.retrieved_at
		// 			});
		// 		});

		// 		this.dataFetched = true;
		// 	});
		// }
	}

	update(){
		console.log("Update called");
	}
}

