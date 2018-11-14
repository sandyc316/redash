import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material';
import { MomentModule } from 'ngx-moment';

import { ProjectList } from './list';

@NgModule({
	declarations: [
		ProjectList
	],
	imports: [
		CommonModule,
		FormsModule,
		MatTableModule,
		MomentModule
	],
	exports: [
		ProjectList
	]
})
export class ProjectsModule { }
