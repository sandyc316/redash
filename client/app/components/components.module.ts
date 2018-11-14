import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'ng2-select';

import { HeaderComponent, FooterComponent } from './layout';
import { FavoritesComponent } from './favorites-control/favorites.component';
import { EditInPlaceComponent } from './edit-in-place/edit-in-place.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { TimeAgoComponent } from './time-ago/time-ago.component';
import { SettingsScreenComponent } from './settings-screen/settings.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicTablesComponent } from './dynamic-tables/dynamic-tables.component';
import { ChartsComponent } from './visualizations/charts/charts.component';
import { VisualizationRenderer } from './visualizations/visualization-renderer';

import { NgxDatatableModule } from './data-tables/';
import { MatInputModule, MatSelectModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { NgxChartsModule } from '@swimlane/ngx-charts';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		MatMenuModule,
		MatInputModule,
		MatSelectModule,
		NgxChartsModule,
		SelectModule
	],
	declarations: [
		HeaderComponent,
		FooterComponent,
		FavoritesComponent,
		EditInPlaceComponent,
		AlertDialogComponent,
		TimeAgoComponent,
		SettingsScreenComponent,
		DynamicFormComponent,
		DynamicTablesComponent,
		ChartsComponent,
		VisualizationRenderer
	],
	exports: [
		HeaderComponent,
		FooterComponent,
		FavoritesComponent,
		EditInPlaceComponent,
		AlertDialogComponent,
		TimeAgoComponent,
		SettingsScreenComponent,
		DynamicFormComponent,
		DynamicTablesComponent,
		NgxDatatableModule,
		ChartsComponent,
		VisualizationRenderer
	]
})

export class ComponentsModule { }
