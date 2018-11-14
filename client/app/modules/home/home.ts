import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
	selector: 'home-page',
	templateUrl: 'home.html'
})

export class Homepage {
	noDashboards: false;
	noQueries: false;

	constructor(/*Events, Dashboard, Query*/) {
		// Events.record('view', 'page', 'personal_homepage');

		// Dashboard.favorites().$promise.then((data) => {
		// 	this.favoriteDashboards = data.results;
		// 	this.noDashboards = data.results.length === 0;
		// });

		// Query.favorites().$promise.then((data) => {
		// 	this.favoriteQueries = data.results;
		// 	this.noQueries = data.results.length === 0;
		// });
	}

	

	


	

}
