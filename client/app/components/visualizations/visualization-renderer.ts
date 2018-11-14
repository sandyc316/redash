import { Component , Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DashboardService } from '@app/services/dashboards';

@Component({
	selector: 'visualization-renderer',
	templateUrl: 'visualization-renderer.html',
})

export class VisualizationRenderer {
	@Input() 
	set options(opts) {
		if(opts) {
			this.selX = opts.xCol;
			this.selY = opts.yCols;
		}
	}

	@Input() 
	set query(query) {
		if (query) {
			this._query = query;
			this.rows = query.queryResult.getData();
				
			let cols = query.queryResult.getColumns();
			cols.forEach( (col) => {
				col.prop = col.name;
			});

			this.cols = cols;	
		}
	}

	@Input() _query: any;
	@Input() type: any;
	// @Input() rows: any;
	// @Input() cols: any;

  	onlyChart: boolean = true;
  	selX: any;
  	selY: any;
  	rows: any = [];
  	cols: any = [];

	constructor(private dashService: DashboardService,
				private router: Router,
				private activRoute: ActivatedRoute) {
		
	}
}

