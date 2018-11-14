import { Component } from '@angular/core';
import { DataSourceService } from '@app/services/data-source';

@Component({
	selector: 'dashboard-list',
	templateUrl: 'list.html',
})

export class DashboardList {
	policy: any;
  	dataSources: any; 

	constructor(/*Policy, Events,*/ private ds: DataSourceService){
		console.log("Inside datasource component");
		console.log(ds);

		try {
			// this.dataSources = ds.query();
			ds.getAllDataSources().subscribe((resp) => {
				console.log(resp);
				this.dataSources = resp;
				
			}, (err) => {
				console.log("Fetching data sources error", err);
			});

			this.policy = {
				isCreateDataSourceEnabled: function() {return true;}
			}

		} catch(e) {
			console.log("Exception in datasource component", e);
		}
		
	}
}

