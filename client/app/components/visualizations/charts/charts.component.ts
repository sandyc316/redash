
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';

import { QueryService } from '@app/services/query/query';


@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html'
})

export class ChartsComponent {
    @Input() 
    set rows(rows: any) {
        this._rows = rows;
        this.prepareData(this.currentType);
    }

    @Input()
    set cols(cols: any) {
        if (cols) {
            cols.forEach( (col) => {
                col.text = col.name;
                col.id = col.name;
            });

            this._cols = cols;
            this.prepareData(this.currentType);
        }
    }

    @Input() set chartName(name: string) {
        this._name = name;
    }

    @Input() showOnlyChart: boolean = false;
    @Input() 
    set selectedX(xCol) {
        if (xCol) {
            this.xCol = xCol;
            this.prepareData(this.currentType);
        }
    }

    @Input() 
    set selectedY(yCols) {
        if (yCols) {
            this.yCols = yCols;
            this.prepareData(this.currentType);
        }
    }

    @Input() 
    set selectedType(type){
        if(type) {
            this.currentType = type;
            this.prepareData(type);
        }
    }


    @Output() save: EventEmitter<any> = new EventEmitter<any>();
    @Output() cancel:EventEmitter<any> = new EventEmitter<any>();
    @Output() nameChange:EventEmitter<any> = new EventEmitter<any>();

    _rows: any = [];
    _cols: any = [];
    _name: string;

    // placeholder: 'Click to edit';
    // editing: boolean = false;
    // oldValue: string = "";
    chartTypes: any = [];
    // chartName: string = "Enter a name for the chart";
    currentType: any = "";
    xCol: any;
    yCols: any = [];


    // single: any[];
    // multi: any[];

    // view: any[];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = '';
    showYAxisLabel = true;
    yAxisLabel = '';

    colorScheme = {
        domain: [
          '#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1', '#26c6da', '#00bcd4', '#00acc1', '#0097a7', '#00838f', '#006064'
        ]
        // domain: ['#356aff']
    };

    data: any = [];


    constructor(public qs: QueryService) {
        if (this.qs.queryResult) {
            this._rows = qs.queryResult.getData();
            this._cols = qs.queryResult.getColumns();
        }
    }

    ngOnInit() {
        this.getChartTypes();
    }

    getChartTypes() {
        this.chartTypes = [{
            id: "BAR-VERTICAL-CHART",
            text: "Bar Vertical"
        },
        {
            id: "BAR-HORIZONTAL-CHART",
            text: "Bar Horizontal"
        },
        {
            id: "LINE-CHART",
            text: "Line"
        },
        {
            id: "AREA-CHART",
            text: "Area"
        },
        {
            id: "PIE-CHART",
            text: "Pie"
        }];
    }

    submit() {
        
    }

    onChartTypeChange(type) {
        this.currentType = "";
        this.prepareData(type['id']);
        this.currentType = type['id'];
    }

    onSelect($event) {
    }

    onXColChange(item) {
        this.xCol = item;
        this.xAxisLabel = item.text;

        this.prepareData(this.currentType);
    }

    onYColChange(data) {
        this.yCols = data;
        if (this.yCols.length > 1)
            this.yAxisLabel = ""
        else
            this.yAxisLabel = this.yCols[0].text;

        this.prepareData(this.currentType);
    }

    prepareData(type) {
        let data = [];

        if (type === "BAR-VERTICAL-CHART" || type === "BAR-HORIZONTAL-CHART" || type === "PIE-CHART") {
            if (this.xCol && this.yCols && this.yCols.length > 0) {
                let yKey = this.yCols[0].text;

                this._rows.forEach( (row) => {
                    data.push({
                        name: row[this.xCol.text],
                        value: row[yKey]
                    });
                });
            }

        } else if (type === "LINE-CHART" || type === "AREA-CHART") {
            if (this.xCol && this.yCols && this.yCols.length > 0) {
                this.yCols.forEach( (col) => {
                    let yKey = col.text;
                    let ySeries = [];
                    
                    this._rows.forEach( (row) => {
                        ySeries.push({
                            name: row[this.xCol.text],
                            value: row[yKey]
                        });
                    });

                    data.push({
                        name: yKey,
                        series: ySeries
                    });
                });
            }
        }

        this.data = data;
    }

    saveChart($event) {
        this.save.emit({
            name: this._name,
            options: {
                xCol: this.xCol,
                yCols: this.yCols,
            },
            type: this.currentType,
            description: ""
        });
    }

    cancelChart($event) {
        this.cancel.emit($event);
    }
}