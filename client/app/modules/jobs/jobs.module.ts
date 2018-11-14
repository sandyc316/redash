import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material';
import { MomentModule } from 'ngx-moment';

import { JobsList } from './list';
import { NewJob } from './new';

@NgModule({
	declarations: [
		JobsList,
		NewJob
	],
	imports: [
		CommonModule,
		FormsModule,
		MatTableModule,
		MomentModule
	],
	exports: [
		JobsList,
		NewJob
	]
})
export class JobsModule { }
