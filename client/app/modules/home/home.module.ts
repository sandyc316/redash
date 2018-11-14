import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Homepage } from './home';

@NgModule({
	declarations: [
		Homepage
	],
	imports: [
		CommonModule
	],
	exports: [
		Homepage
	]
})
export class HomepageModule { }
