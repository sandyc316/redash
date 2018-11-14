import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'query-header',
	templateUrl: 'header.html'
})

export class QueryHeader {
	@Input() query: any;
	@Output() onNameChanged: EventEmitter<any> = new EventEmitter<any>();
	@Output() onFavorite: EventEmitter<any> = new EventEmitter<any>();

	noDashboards: false;
	noQueries: false;
	isQueryOwner: true;
	canViewSource: true;

	constructor() {
		
	}

	canEdit() {
		return true;
	}

	saveName(name) {
		console.log("Saving query name called in QueryHeader. Saving as ", name );
		this.query.name = name;
		this.onNameChanged.emit(name);
		
		return "";
	}

	onFavClick() {
		console.log("Favorite icon clicked");
		this.query.isFavorite = true;
		this.onFavorite.emit();
	}
}
