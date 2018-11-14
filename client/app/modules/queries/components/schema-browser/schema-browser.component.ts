import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'schema-browser',
    templateUrl: './schema-browser.component.html'
})
export class SchemaBrowserComponent {
    @Input() 
    set schema(schema){
        this._schema = schema;
        this.filteredSchema = schema;
    }

    @Output() refreshschema: EventEmitter<any> = new EventEmitter<any>();

    schemaFilter = new FormControl('');
    _schema: any
    filteredSchema: any;

    constructor() {
        
    }

    ngOnInit() {
        this.schemaFilter.valueChanges.subscribe(val => {
            this.filteredSchema = this._schema.filter(item => item.name.includes(val));
        });
    }

    showTable(table) {
        table.collapsed = !table.collapsed;
        // $scope.$broadcast('vsRepeatTrigger');
    };

    getSize(table) {
        let size = 22;

        if (!table.collapsed) {
            size += 18 * table.columns.length;
        }
        
        return size;
    };

    isEmpty() {
        return this.schema === undefined || this.schema.length === 0;
    };

    itemSelected($event, hierarchy) {
        console.log($event);
        // $rootScope.$broadcast('query-editor.command', 'paste', hierarchy.join('.'));
        // $event.preventDefault();
        // $event.stopPropagation();
    };

    onRefresh(){
        console.log("Refresh schema called in schema browser");
        if(this.refreshschema)
            this.refreshschema.emit()
    }

}