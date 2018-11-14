import { Component , Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DashboardService } from '@app/services/dashboards';

@Component({
	selector: 'widget-renderer',
	templateUrl: 'widget-renderer.html',
})

export class WidgetRenderer {
	@Input() 
	set chartOpts(opts) {
		if(opts) {
			this.selX = opts.xCol;
			this.selY = opts.yCols;
		}
	}

	@Input() type;
	@Input() rows;
	@Input() cols;

  	onlyChart: boolean = true;
  	selX: any;
  	selY: any;

	constructor(private dashService: DashboardService,
				private router: Router,
				private activRoute: ActivatedRoute) {
		
	}
}

