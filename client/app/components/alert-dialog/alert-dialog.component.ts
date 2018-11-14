import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'alert-dialog',
    templateUrl: './alert-dialog.component.html'
})
export class AlertDialogComponent {
    @Input() title: string;
    @Input() message: string;
    @Input() confirmTitle: string;
    @Input() confirmClass: string;


    constructor(public activeModal: NgbActiveModal) {
    }

    ngOnInit() {
    }

}