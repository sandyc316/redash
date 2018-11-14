import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { Http, HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { MomentModule } from 'ngx-moment';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
	ComponentsModule
} from './components';
import { AlertDialogComponent } from '@app/components/alert-dialog/alert-dialog.component';


import { Api } from './services/api';
import { CurrentUser } from './services/currentUser';
import { DataSourceService } from '@app/services/data-source';
import { QueryService } from '@app/services/query/query';
import { VisualizationService } from '@app/services/visualizations';
import { DashboardService } from '@app/services/dashboards';
import { JobService } from '@app/services/jobs';
import { ProjectService } from '@app/services/projects';

@NgModule({
	bootstrap: [ AppComponent ],
	imports: [
		BrowserModule,
		ComponentsModule,
		FormsModule,
		AppRoutingModule,
		HttpModule,
		RouterModule.forRoot([]),
		BrowserAnimationsModule,
		NgbModule.forRoot(),
		ToastrModule.forRoot({
			positionClass: 'toast-bottom-right'
		}),
		MomentModule
	],
	entryComponents: [
		AlertDialogComponent
	],
	declarations: [ 
		AppComponent
	],
	providers:[Api, CurrentUser, DataSourceService, QueryService, VisualizationService, DashboardService, JobService, ProjectService]
})

export class AppModule {
}

