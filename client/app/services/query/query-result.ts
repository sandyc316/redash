import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { sortBy, uniq, values, some, each, isArray, isNumber, isString, includes, forOwn } from 'lodash';


import { Api } from '../api';


const ALL_VALUES = '*';
const NONE_VALUES = '-';

function handleErrorResponse(queryResult, response) {
	if (response.status === 403) {
		queryResult.update(response.data);

	} else if (response.status === 400 && 'job' in response.data) {
		
		queryResult.update(response.data);
	} else {
		
		console.log('Unknown error', response);
		queryResult.update({
			job: {
				error: 'unknown error occurred. Please try again later.',
				status: 4,
			},
		});
	}
}

const statuses = {
	1: 'waiting',
	2: 'processing',
	3: 'done',
	4: 'failed',
};

const filterTypes = ['filter', 'multi-filter', 'multiFilter'];

function getColumnNameWithoutType(column) {
	let typeSplit;
	if (column.indexOf('::') !== -1) {
		typeSplit = '::';
	} else if (column.indexOf('__') !== -1) {
		typeSplit = '__';
	} else {
		return column;
	}

	const parts = column.split(typeSplit);
	if (parts[0] === '' && parts.length === 2) {
		return parts[1];
	}

	if (!includes(filterTypes, parts[1])) {
		return column;
	}

	return parts[0];
}

export function getColumnCleanName(column) {
	return getColumnNameWithoutType(column);
}

function getColumnFriendlyName(column) {
	return getColumnNameWithoutType(column).replace(/(?:^|\s)\S/g, a =>
		a.toUpperCase());
}

export class QueryResult {
	isLoadingResult: boolean = false;
	job: any = {};
	columns: any;
	query_result: any = {};
	status: string = 'waiting';
	filters: any;
	filterFreeze: any;
	id: any;
	filteredData: any;
	columnNames: any;

	updatedAt: any; // = moment();

    constructor(/*QueryResultError*/ props: any,
        public api: Api
        ) {
        // this.errorMessage = errorMessage;
        // this.updatedAt = moment.utc();

        // this.deferred = $q.defer();
		this.job = {};
		this.query_result = {};
		this.status = 'waiting';
		this.filters = undefined;
		this.filterFreeze = undefined;

		// this.updatedAt = moment();

		// extended status flags
		this.isLoadingResult = false;

		if (props) {
			this.update(props);
		}
    }
	
	get(dataSourceId, query, maxAge, queryId) {
		const params = { data_source_id: dataSourceId, query, max_age: maxAge, query_id: '' };
		if (queryId !== undefined) {
			params.query_id = queryId;
		}

		return this.api.doPost("api/query_results", params).pipe(map(res => JSON.parse(res["_body"])));
	}

	getById(id) {
		return this.api.doGet("api/query_results/" + id);
	}


	post(params) {
		// return this.api.doPost('api/query_results/' + this.id, {params});
	}

	update(props) {
      	Object.assign(this, props);
	}

	refreshStatus(query) {
    }

	getStatus() {
		if (this.isLoadingResult) {
			return 'loading-result';
		}
		return this.status || statuses[this.job.status];
	}

	getRawData() {
		if (!this.query_result.data) {
			return null;
		}

		return this.query_result.data.rows;
	}

	getData() {
		if (!this.query_result.data) {
			return null;
		}

		function filterValues(filters) {
			if (!filters) {
				return null;
			}

			return filters.reduce(
				(str, filter) =>
					str + filter.current
				, '',
			);
		}

		const filters = this.getFilters();
		const filterFreeze = filterValues(filters);

		if (this.filterFreeze !== filterFreeze) {
			this.filterFreeze = filterFreeze;

			if (filters) {
				filters.forEach((filter) => {
					if (filter.multiple && includes(filter.current, ALL_VALUES)) {
						filter.current = filter.values.slice(2);
					}

					if (filter.multiple && includes(filter.current, NONE_VALUES)) {
						filter.current = [];
					}
				});

				this.filteredData = this.query_result.data.rows.filter(row =>
					filters.reduce((memo, filter) => {
						if (!isArray(filter.current)) {
							filter.current = [filter.current];
						}

						return (memo && some(filter.current, (v) => {
							const value = row[filter.name];
							if (moment.isMoment(value)) {
								return value.isSame(v);
							}
							// We compare with either the value or the String representation of the value,
							// because Select2 casts true/false to "true"/"false".
							return (v === value || String(value) === v);
						}));
					}, true));
			} else {
				this.filteredData = this.query_result.data.rows;
			}
		}

		return this.filteredData;
	}

	getColumnNames() {
		if (this.columnNames === undefined && this.query_result.data) {
			this.columnNames = this.query_result.data.columns.map(v => v.name);
		}

		return this.columnNames;
	}

	getColumnCleanNames() {
		return this.getColumnNames().map(col => getColumnCleanName(col));
	}

	getColumnFriendlyNames() {
		return this.getColumnNames().map(col => getColumnFriendlyName(col));
	}

	getColumns() {
		if (this.columns === undefined && this.query_result.data) {
			this.columns = this.query_result.data.columns;
		}

		return this.columns;
	}

	getFilters() {
		if (!this.filters) {
			this.prepareFilters();
		}

		return this.filters;
	}

	prepareFilters() {
		if (!this.getColumns()) {
			return;
		}

		const filters = [];

		this.getColumns().forEach((col) => {
			const name = col.name;
			const type = name.split('::')[1] || name.split('__')[1];
			if (includes(filterTypes, type)) {
				// filter found
				const filter = {
					name,
					friendlyName: getColumnFriendlyName(name),
					column: col,
					values: [],
					multiple: (type === 'multiFilter') || (type === 'multi-filter'),
				};
				filters.push(filter);
			}
		}, this);

		this.getRawData().forEach((row) => {
			filters.forEach((filter) => {
				filter.values.push(row[filter.name]);
				if (filter.values.length === 1) {
					if (filter.multiple) {
						filter.current = [row[filter.name]];
					} else {
						filter.current = row[filter.name];
					}
				}
			});
		});

		filters.forEach((filter) => {
			if (filter.multiple) {
				filter.values.unshift(ALL_VALUES);
				filter.values.unshift(NONE_VALUES);
			}
		});

		filters.forEach((filter) => {
			filter.values = uniq(filter.values, (v) => {
				if (moment.isMoment(v)) {
					return v.unix();
				}
				return v;
			});
		});

		this.filters = filters;
	}
}