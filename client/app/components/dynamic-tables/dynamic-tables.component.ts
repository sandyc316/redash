import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';

// function filterRows(rows, searchTerm, columns) {
// 	if ((searchTerm === '') || (columns.length === 0) || (rows.length === 0)) {
// 		return rows;
// 	}
// 	searchTerm = searchTerm.toUpperCase();
// 	return filter(rows, (row) => {
// 		for (let i = 0; i < columns.length; i += 1) {
// 			const columnName = columns[i].name;
// 			const formatFunction = columns[i].formatFunction;
// 			if (row[columnName] !== undefined) {
// 				let value = formatFunction ? formatFunction(row[columnName]) : row[columnName];
// 				value = ('' + value).toUpperCase();
// 				if (value.indexOf(searchTerm) >= 0) {
// 					return true;
// 				}
// 			}
// 		}
// 		return false;
// 	});
// }

function sortRows(rows, orderBy) {
	if ((orderBy.length === 0) || (rows.length === 0)) {
		return rows;
	}
	// Create a copy of array before sorting, because .sort() will modify original array
	return [].concat(rows).sort((a, b) => {
		let va;
		let vb;
		for (let i = 0; i < orderBy.length; i += 1) {
			va = a[orderBy[i].name];
			vb = b[orderBy[i].name];
			if (va < vb) {
				// if a < b - we should return -1, but take in account direction
				return orderBy[i].direction * -1;
			}
			if (va > vb) {
				// if a > b - we should return 1, but take in account direction
				return orderBy[i].direction * 1;
			}
		}
		return 0;
	});
}

function validateItemsPerPage(value, defaultValue) {
	defaultValue = defaultValue || 10;
	value = parseInt(value, 10) || defaultValue;
	return value > 0 ? value : defaultValue;
}

// Optimized rendering
// Instead of using two nested `ng-repeat`s by rows and columns,
// we'll create a template for row (and update it when columns changed),
// compile it, and then use `ng-repeat` by rows and bind this template
// to each row's scope. The goal is to reduce amount of scopes and watchers
// from `count(rows) * count(cols)` to `count(rows)`. The major disadvantage
// is that cell markup should be specified here instead of template.
// function createRowRenderTemplate(columns, $compile) {
// 	const rowTemplate = map(columns, (column, index) => {
// 		switch (column.displayAs) {
// 			case 'json':
// 				return `
// 					<dynamic-table-json-cell column="columns[${index}]" 
// 						value="row[columns[${index}].name]"></dynamic-table-json-cell>
// 				`;
// 			default:
// 				return `
// 					<dynamic-table-default-cell column="columns[${index}]" 
// 						row="row"></dynamic-table-default-cell>
// 				`;
// 		}
// 	}).join('');
// 	return $compile(rowTemplate);
// }

@Component({
	selector: 'dynamic-tables',
	templateUrl: 'dynamic-tables.component.html'
})
export class DynamicTablesComponent {
	@Input() columns: any;
	@Input() rows: any;
	@Input() itemsPerPage: number = 50;

	rawRows: any = [];
	currentPage: number = 1;
	searchTerm: string = '';
	preparedRows: any = [];
	rowsToDisplay: any = [];
	orderBy: any = [];
	orderByColumnsIndex: any = {};
	orderByColumnsDirection: any = {};
	searchColumns: any = [];
	renderSingleRow: any = null;

	constructor() {


	}

	ngOnInit() {
        this.rawRows = this.rows.map(function(v) {
        	return Object.keys(v).map(function(vv) {
        		// console.log(v[vv]);

        		return v[vv];
        	});
        });

        console.log(this.rawRows);
    }

    updateOrderByColumnsInfo() {
		this.orderByColumnsIndex = {};
		this.orderByColumnsDirection = {};
		// each(this.orderBy, (column, index) => {
		// 	this.orderByColumnsIndex[column.name] = index + 1;
		// 	this.orderByColumnsDirection[column.name] = column.direction;
		// });
	};

	updateRowsToDisplay(performFilterAndSort) {
		// if (performFilterAndSort) {
		// 	this.preparedRows = sortRows(
		// 		filterRows(this.rows, this.searchTerm, this.searchColumns),
		// 		this.orderBy,
		// 	);
		// }
		const first = (this.currentPage - 1) * this.itemsPerPage;
		const last = first + this.itemsPerPage;
		this.rowsToDisplay = this.preparedRows.slice(first, last);
	}

	setColumns(columns) {
		// 1. reset sorting
		// 2. reset current page
		// 3. reset search
		// 4. get columns for search
		// 5. update row rendering template
		// 6. prepare rows

		this.columns = columns;
		this.updateOrderByColumnsInfo();
		this.orderBy = [];
		this.currentPage = 1;
		this.searchTerm = '';
		// this.searchColumns = filter(this.columns, 'allowSearch');
		// this.renderSingleRow = createRowRenderTemplate(this.columns, $compile);
		this.updateRowsToDisplay(true);
	}

	setRows(rows) {
		// 1. reset current page
		// 2. prepare rows

		this.rows = rows;
		this.currentPage = 1;
		this.updateRowsToDisplay(true);
	}

	

	onColumnHeaderClick ($event, column) {
		// const orderBy = find(this.orderBy, item => item.name === column.name);
		// if (orderBy) {
		// 	// ASC -> DESC -> off
		// 	if (orderBy.direction === 1) {
		// 		orderBy.direction = -1;
		// 		if (!$event.shiftKey) {
		// 			this.orderBy = [orderBy];
		// 		}
		// 	} else {
		// 		if ($event.shiftKey) {
		// 			this.orderBy = filter(this.orderBy, item => item.name !== column.name);
		// 		} else {
		// 			this.orderBy = [];
		// 		}
		// 	}
		// } else {
		// 	if (!$event.shiftKey) {
		// 		this.orderBy = [];
		// 	}
		// 	this.orderBy.push({
		// 		name: column.name,
		// 		direction: 1,
		// 	});
		// }
		this.updateOrderByColumnsInfo();
		this.updateRowsToDisplay(true);


		// Remove text selection - may occur accidentally
		if ($event.shiftKey) {
			document.getSelection().removeAllRanges();
		}
	}

	onPageChanged() {
		this.updateRowsToDisplay(false);
	}

	onSearchTermChanged() {
		// this.preparedRows = sortRows(
		// 	filterRows(this.rows, this.searchTerm, this.searchColumns),
		// 	this.orderBy,
		// );
		this.currentPage = 1;
		this.updateRowsToDisplay(true);
	}

	onChanges(changes) {
		if (changes.columns) {
			if (changes.rows) {
				// if rows also changed - temporarily set if to empty array - to avoid
				// filtering and sorting
				this.rows = [];
			}
			this.setColumns(changes.columns.currentValue);
		}

		if (changes.rows) {
			this.setRows(changes.rows.currentValue);
		}

		if (changes.itemsPerPage) {
			this.itemsPerPage = 50;//this.validateItemsPerPage(this.itemsPerPage);
			this.currentPage = 1;
			this.updateRowsToDisplay(false);
		}
	};


}
