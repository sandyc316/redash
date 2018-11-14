import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from '../../components/components.module';
import { MatInputModule, MatSelectModule, MatTableModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { SelectModule } from 'ng2-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NewQuery } from './create/query';
import { QueryEditor } from './create/components/editor';
import { QueryHeader } from './create/components/header';
import { QueryResults } from './create/components/results';
import { QuerySchema } from './create/components/schema';
import { QueriesList } from './list/queries';
import { QueryCharts } from './charts/query';
import { SchemaBrowserComponent } from './components/schema-browser/schema-browser.component';
import { QueryEditorComponent } from './components/query-editor/query-editor.component';

import { AceEditorModule } from 'ng2-ace-editor';

@NgModule({
	declarations: [
		NewQuery,
		QueryEditor,
		QueryHeader,
		QueryResults,
		QuerySchema,
		QueriesList,
		QueryCharts,
		SchemaBrowserComponent,
		QueryEditorComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ComponentsModule,
		AceEditorModule,
		MatInputModule,
		MatSelectModule,
		MatMenuModule,
		MatTableModule,
		SelectModule,
		NgbModule
	],
	exports: [
		NewQuery,
		QueriesList,
		QueryCharts
	]
})

export class QueriesModule { }
