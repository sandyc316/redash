import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertDialogComponent } from '@app/components/alert-dialog/alert-dialog.component';

import { ProjectService } from '@app/services/projects';

@Component({
	selector: 'page-projects-list',
	templateUrl: 'list.html',
})

export class ProjectList {
	loaded: boolean = false;
	showEmptyState: boolean = true;
	term: string = "";
	pageSize: number = 20;
	showMyQueries: boolean = true;
	projRows: any = []
	dataFetched: boolean = false;
	displayedColumns: string[] = ['name', 'path', 'status', 'started_at', 'finished_at', "actions"];
	statusDisplayOpts: any = {
		"NOT_PROCESSED": {
			class: 'not-proccessed',
			txt: "Not processed yet"
		},
		"PROCESSING_STARTED": {
			class: 'processing-started',
			txt: "Processing started"
		},
		"PROCESSING_COMPLETE": {
			class: 'processing-complete',
			txt: "Processing complete"
		},
		"PROCESSING_CANCELLED": {
			class: 'processing-cancelled',
			txt: "Processing cancelled"
		}
	}

	constructor(private router: Router,
				private activRoute: ActivatedRoute,
				public projServ: ProjectService,
				private modalService: NgbModal) {

	}

	ngOnInit() {
		this.getAllProjects();
		
	}

	getAllProjects(refresh=false) {
		this.projServ.getAll().subscribe((resp) => {
			this.updateprojects(resp, refresh);
			this.dataFetched = true;
		});
	}

	scanProjects(){
		this.projServ.scan().subscribe((resp) => {
			this.updateprojects(resp);
			this.dataFetched = true;
		});
	}

	refreshProjects(){
		this.getAllProjects(true);
	}

	updateprojects(result, refresh=false) {
		let that = this;
		if (refresh)
			that.projRows = [];

		result.data.forEach(function(proj) {
			that.projRows.push({
				"id": proj.id,
				"name": proj.name,
				"path": proj.path,
				"status": proj.status,
				"started_at": proj.started_at,
				"finished_at": proj.finished_at,
				"runtime": "45.6",
				"statusClass": that.statusDisplayOpts[proj.status]['class'],
				"statusTxt": that.statusDisplayOpts[proj.status]['txt'],
				"forceProcess": true
			});
		});
	}

	update() {

	}

	startProcessing(projId) {
		this.projServ.processProject(projId).subscribe((resp) => {
			this.getAllProjects(true);
		});
	}

	startReProcessing(projId) {
		const modalRef = this.modalService.open(AlertDialogComponent);
    	modalRef.componentInstance.title = "Re-process project?";
    	modalRef.componentInstance.message = "This will remove existing processed files. Do you wish to continue?";
    	modalRef.componentInstance.confirmClass = "btn-danger";
    	modalRef.componentInstance.confirmTitle = "Continue";

    	modalRef.result.then((result) => {
			this.projServ.processProject(projId, true).subscribe((resp) => {
				this.getAllProjects(true);
			});
		}, (reason) => {
			// this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
	}

	cancelProcessing(projId) {
		const modalRef = this.modalService.open(AlertDialogComponent);
    	modalRef.componentInstance.title = "Cancel project processing";
    	modalRef.componentInstance.message = "Are you sure you want to cancel the processing of the project?";
    	modalRef.componentInstance.confirmClass = "btn-danger";
    	modalRef.componentInstance.confirmTitle = "Yes";

    	modalRef.result.then((result) => {
			this.projServ.cancelProject(projId).subscribe((resp) => {
				this.getAllProjects(true);
			});
		}, (reason) => {
			// this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
	}
}

