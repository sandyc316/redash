import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { DataSourceService } from '@app/services/data-source';
import { QueryService } from '@app/services/query/query';

import 'brace';
import 'brace/mode/python';
import 'brace/mode/sql';
import 'brace/mode/json';
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';
import 'brace/theme/eclipse';


// By default Ace will try to load snippet files for the different modes and fail.
// We don't need them, so we use these placeholders until we define our own.
function defineDummySnippets(mode) {
	(window as any).ace.define(`ace/snippets/${mode}`, ['require', 'exports', 'module'], (require, exports) => {
		exports.snippetText = '';
		exports.scope = mode;
	});
}

defineDummySnippets('python');
defineDummySnippets('sql');
defineDummySnippets('json');
defineDummySnippets('text');


@Component({
	selector: 'query-editor',
	templateUrl: 'editor.html'
})

export class QueryEditor {
	@ViewChild('editor') editor;

    @Input() query: any;

	@Output() onQueryExecute: EventEmitter<any> = new EventEmitter<any>();
	@Output() onQuerySave: EventEmitter<any> = new EventEmitter<any>();

	noDashboards: boolean = false;
	noQueries: boolean = false;
	sourceMode: boolean = true;
	showDataset: boolean = false;
	canEdit: boolean = true;
	queryExecuting: boolean = false;
	cancelling: boolean = false;
	showLog: boolean = false;

	editorOptions: any = {
		enableBasicAutocompletion: true,
		enableSnippets: true,
		enableLiveAutocompletion: true,
	};

	constructor(private ds: DataSourceService,
				private qs: QueryService) {

	}

	ngOnInit() {
        this.editor.setTheme("eclipse");

        // this.editor.getEditor().setOptions({
        //     enableBasicAutocompletion: true
        // });

        this.editor.getEditor().commands.addCommand({
            name: "showOtherCompletions",
            bindKey: "Ctrl-.",
            exec: function (editor) {

            }
        });
    }

    addNewParameter() {
    	return;
    }

    canExecuteQuery() {
    	return true;
    }

    executeQuery() {

    	if (!this.canExecuteQuery()) {
			return;
		}

		if (!this.query.query) {
			return;
		}

		this.onQueryExecute.emit();
		
		//this.getQueryResult(0);
		// this.lockButton(true);
		this.cancelling = false;
    }

    lockButton(lock) {
		this.queryExecuting = lock;
	}


	saveQuery() {	
		this.onQuerySave.emit();
	}

	formatQuery(){
		console.log(this.query.query);	
	}
}
