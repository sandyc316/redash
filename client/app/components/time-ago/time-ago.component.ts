import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'time-ago',
    templateUrl: './time-ago.component.html'
})
export class TimeAgoComponent {
    @Input() 
    value: any;

    constructor() {
    }

    ngOnInit() {
    
    }
}