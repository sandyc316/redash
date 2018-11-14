import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from '../../components/components.module';
import { AlertDialogComponent } from '@app/components/alert-dialog/alert-dialog.component';


import { DataSources } from './data-sources.component';
import { DataSourcesList } from './data-sources-list.component';

@NgModule({
	declarations: [
		DataSources,
		DataSourcesList
	],
	imports: [
		CommonModule,
		FormsModule,
		ComponentsModule
	],
	exports: [
		DataSources,
		DataSourcesList
	],
	entryComponents: [
        AlertDialogComponent
    ],
})

export class DataSourcesModule { }
