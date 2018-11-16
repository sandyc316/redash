import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { DataSourceService } from '@app/services/data-source';
import { AlertDialogComponent } from '@app/components/alert-dialog/alert-dialog.component';


@Component({
	selector: 'data-sources-list',
	templateUrl: 'data-sources-list.component.html',
	entryComponents:[ AlertDialogComponent ]
})

export class DataSourcesList {
	policy: any;
  	dataSources: any; 
  	dataSource: any;
  	dataSourceId: any;
  	title: string = "Datasources";
  	types: any;
  	type: any;
  	search: string = "";
  	currentType: any;
  	imgRoot: string = "/static/images/db-logos";
  	canChangeType: boolean = true;
  	actions: any;

  	deleteTitle: string = "Delete Data Source";
  	deleteMsg: string = "Are you sure you want to delete this data source?";
  	deleteOpts: any = {
  		class: 'btn-danger', 
  		show: true, 
  		title: 'DELETE'
  	}

  	

	constructor(private ds: DataSourceService,
				private router: Router,
				private activRoute: ActivatedRoute,
				private modalService: NgbModal,
				private toastr: ToastrService){
		
		this.type = undefined;
		this.dataSource = ds;
		this.actions = [
			{ 
				name: 'Delete', class: 'btn-danger', callback: this.deleteDataSource 
			},
			{
				name: 'Test Connection', class: 'btn-default pull-right', callback: this.testConnection, disableWhenDirty: true,
			},
		];

		this.activRoute.params.subscribe( params => {
			this.dataSource.id = params.id;
			
		});
	}

	ngOnInit() {
		this.dataSource.query().subscribe((resp) => {
			this.types = resp;

			if (this.dataSource.id) {
				this.dataSource.get(this.dataSource.id).subscribe((resp) => {

					this.dataSource.type = resp.type;
					this.dataSource.name = resp.name;
					this.dataSource.options = resp.options;

					this.getTypeFromTypes();

				}, (err) => {
					console.log("Fetching data sources error", err);
				});	
			}

		}, (err) => {
			console.log("Fetching data sources error", err);
		});

	}

	onTypeSelect(type) {
		this.type = type;
		this.dataSource.type = type.type;
	}

	getTypeFromTypes() {
		if (this.types) {
			if (this.dataSource.id && this.dataSource.name) {
				for (const t in this.types) {
					if (this.types[t]['type'] === this.dataSource.type){

						this.type = this.types[t];
					}
				}
			}	
		}
		
	}

	setType(type) {
		this.type = type;

		// this.dataSource.type = type.type;
	};

	resetType() {
		this.type = undefined;
		// this.dataSource = this.ds; //new DataSource({ options: {} });
	}

	onBtnClick(btnName) {
		// console.log(btnName);
		if (btnName === "Test Connection")
			this.testConnection();
		else if (btnName === "Delete")
			this.deleteDataSource();
		else
			if (this.dataSource.id)
				this.update();
			else
				this.save();
	}

	update() {
		this.correctFieldTypes();
		
		this.dataSource.update().subscribe((resp) => {
			this.toastr.success('Data source updated successfully');
        }, (err) => {
            console.log("Error updating ", err);
            this.toastr.error('Unable to update the data source ' + err);
        });
	}

	save() {
		this.correctFieldTypes();
		
		this.dataSource.save().subscribe((resp) => {
         	this.router.navigate(["/data_sources/" + resp.id]);
         	this.toastr.success('Data source saved successfully');
        }, (err) => {
            console.log("Error saving ", err);
            this.toastr.error('Unable to save the data source ' + err);
        });
	}

	correctFieldTypes() {
		let configurationSchema = this.type.configuration_schema; 
		for (const key in configurationSchema.properties) {
	        for (const k in this.dataSource.options) {
	        	if (key === k) {
	        		if (configurationSchema.properties[key]['type'] === 'number')
	        			this.dataSource.options[k] = parseFloat(this.dataSource.options[k])
	        	}
	        }
	    }
	}

	deleteDataSource() {
		console.log("Opening delete datasource modal");
		const modalRef = this.modalService.open(AlertDialogComponent);
    	modalRef.componentInstance.title = this.deleteTitle;
    	modalRef.componentInstance.message = this.deleteMsg;
    	modalRef.componentInstance.confirmClass = "btn-danger";
    	modalRef.componentInstance.confirmTitle = "DELETE";

    	modalRef.result.then((result) => {
			console.log(result);
			this.dataSource.delete().subscribe((resp) => {
				console.log(resp);
				console.log('Data source deleted successfully.');
				this.router.navigate(["/data_sources/"]);
				// toastr.success('Data source deleted successfully.');
				// $location.path('/data_sources/');
			}, (httpResponse) => {
				console.log('Failed to delete data source.');
				// logger('Failed to delete data source: ', httpResponse.status, httpResponse.statusText, httpResponse.data);
				// toastr.error('Failed to delete data source.');
			});
		}, (reason) => {
			console.log(reason);
			// this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
	}

	testConnection() {

		this.dataSource.test({ id: this.dataSource.id }).subscribe((httpResponse) => {
			console.log(httpResponse);
			if (httpResponse.ok) {
				console.log("Test connection was successful");
				this.toastr.success('Test connection was successful');
			} else {
				this.toastr.error('Test connection failed');
			}

		}, (httpResponse) => {
			console.log(httpResponse);
			// logger('Failed to test data source: ', httpResponse.status, httpResponse.statusText, httpResponse);
			this.toastr.error('Unknown error occurred while performing connection test. Please try again later.', 'Connection Test Failed:', { timeOut: 10000 });
		});
	}
}

