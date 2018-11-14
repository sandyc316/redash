import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertDialogComponent } from '@app/components/alert-dialog/alert-dialog.component';
import { VisualizationService } from '@app/services/visualizations';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'query-results',
	templateUrl: 'results.html'
})

export class QueryResults {
	@Input() columns: any;
	@Input() rows: any;
	@Input() 
	set query(query) {
		this._query = query;
	}

	itemsPerPage: number = 50;
	_query: any;

	constructor(private router: Router,
				private modalService: NgbModal,
				private toastr: ToastrService,
				public vs: VisualizationService) {
		
	}

	ngOnInit() {
		
	}

	deleteVisualization ($event, vis) {
		console.log(vis);
		const modalRef = this.modalService.open(AlertDialogComponent);
    	modalRef.componentInstance.title = "Delete Visualization";
    	modalRef.componentInstance.message = "This will remove remove the visualization. Do you wish to continue?";
    	modalRef.componentInstance.confirmClass = "btn-danger";
    	modalRef.componentInstance.confirmTitle = "Continue";

    	modalRef.result.then((result) => {
    		console.log(vis);
			this.vs.delete(vis.id).subscribe((resp) => {
				console.log(resp);
				this._query.visualizations = this._query.visualizations.filter(item => item.id !== vis.id);
			}, (err) => {
				this.toastr.error('Unable to delete the visualization ' + err);
			});
		}, (reason) => {
			console.log(reason);
			// this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
	}

	openVisualizationEditor(vis) {
		console.log("Opening Visualization editor ", vis);
		
		if (!this._query.id)
			console.log("Please save the query first");
		if (!vis)
			this.router.navigate(["/queries/" + this._query.id + "/charts"]);
		else 
			this.router.navigate(["/queries/" + this._query.id + "/charts", {
				type: vis.type,
				visId: vis.id,
				name: vis.name,
				options: JSON.stringify(vis.options)
			}]);
	}
}
