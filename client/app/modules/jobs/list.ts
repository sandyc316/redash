import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { JobService } from '@app/services/jobs';

@Component({
	selector: 'page-jobs-list',
	templateUrl: 'list.html',
})

export class JobsList {
	loaded: boolean = false;
	showEmptyState: boolean = true;
	term: string = "";
	pageSize: number = 20;
	showMyQueries: boolean = true;
	jobRows: any = []
	dataFetched: boolean = false;
	displayedColumns: string[] = ['type', 'name', 'started_at', 'finished_at', 'runtime', 'status'];

	constructor(private router: Router,
				private activRoute: ActivatedRoute,
				public js: JobService,
				private modalService: NgbModal) {

	}

	ngOnInit() {
		this.js.getAll().subscribe((resp) => {
			console.log(resp);
			let that = this;
			resp.data.forEach(function(job) {
				that.jobRows.push({
					"id": job.id,
					"type": job.type,
					"name": job.name,
					"started_at": job.started_at,
					"finished_at": job.finished_at,
					"status": job.status,
					"runtime": "45.6", //job.runtime > 1 ? job.runtime : 1,
				});
			});

			this.dataFetched = true;
		});
	}

	update(){
		console.log("Update called");
	}
}

