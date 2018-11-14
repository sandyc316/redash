import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from '@app/components/components.module';
import { AlertDialogComponent } from '@app/components/alert-dialog/alert-dialog.component';


import { DashboardList } from './dashboards/list';
import { DashboardView } from './dashboards/view';
import { DashboardWidget } from './dashboards/component/widget';
import { WidgetRenderer } from './dashboards/component/widget-renderer';

@NgModule({
	declarations: [
		DashboardList,
		DashboardView,
		DashboardWidget,
		WidgetRenderer
	],
	imports: [
		CommonModule,
		FormsModule,
		ComponentsModule
	],
	exports: [
		DashboardList,
		DashboardView,
		DashboardWidget,
		WidgetRenderer
	],
	entryComponents: [
        AlertDialogComponent
    ],
})

export class DashboardsModule { }
