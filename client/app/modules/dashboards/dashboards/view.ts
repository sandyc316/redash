import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { DashboardService } from '@app/services/dashboards';
import { AlertDialogComponent } from '@app/components/alert-dialog/alert-dialog.component';

@Component({
	selector: 'dashboard-view',
	templateUrl: 'view.html',
})

export class DashboardView {
  	dashName: string = ""; 
  	dashboard: any;
  	widgets: any = [];

	constructor(private dashService: DashboardService,
				private router: Router,
				private activRoute: ActivatedRoute,
				private modalService: NgbModal,
				public toastr: ToastrService) {

		this.activRoute.params.subscribe( params => {
			if (params.id) {
				this.dashName = params.id;
			} else
				this.router.navigate(["/dashboards/my"]);
			
		});

		this.getDashboardDetails();
	}

	getDashboardDetails() {
		try {
			this.dashService.get('my').subscribe((resp) => {
				this.dashboard = resp;
				this.widgets = resp.widgets;

				
			}, (err) => {
				console.log("Fetching dashboard error", err);
				this.createMyDashboard();
			});

		} catch(e) {
			console.log("Exception in getting my dashboard", e);
		}
	}

	createMyDashboard() {
		try {
			this.dashService.save('my').subscribe((resp) => {
				this.dashboard = resp;
				this.widgets = resp.widgets;

			}, (err) => {
				console.log("Fetching dashboard error", err);
			});

		} catch(e) {
			console.log("Exception in getting my dashboard", e);
		}
	}

	removeWidgetFromDashboard(widgetId) {
		const modalRef = this.modalService.open(AlertDialogComponent);
    	modalRef.componentInstance.title = "Remove widget?";
    	modalRef.componentInstance.message = "Do you really want to remove the widget from the dashboard?";
    	modalRef.componentInstance.confirmClass = "btn-danger";
    	modalRef.componentInstance.confirmTitle = "Remove";

    	modalRef.result.then((result) => {
			this.dashService.removeWidget(widgetId).subscribe((resp) => {
				console.log('Widget deleted successfully.');
				this.toastr.success('Widget deleted successfully.');
				this.widgets = this.widgets.filter(widget => widget.id !== widgetId);
				
			}, (httpResponse) => {
				console.log('Failed to delete data source.');
				this.toastr.error('Failed to delete the widget. Please try again later.');
			});
		}, (reason) => {
			console.log(reason);
		});
	}
}

