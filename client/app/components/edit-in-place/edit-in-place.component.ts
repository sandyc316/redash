import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'edit-in-place',
    templateUrl: './edit-in-place.component.html',
    // styleUrls: ['./header.component.scss']
})
export class EditInPlaceComponent {
    @Input() value: any;
    @Input() ignoreBlanks: boolean;
    // @Input() done: any;
    @Input() editable: any;

    @Output() done: EventEmitter<any> = new EventEmitter<any>();
    
    @ViewChild('editInput') input:ElementRef; 

    placeholder: 'Click to edit';
    editing: boolean = false;
    oldValue: string = "";

    constructor(myElement: ElementRef) {
        this.oldValue = this.value;
    }

    ngOnInit() {
    }

    edit() {
        this.oldValue = this.value;

        this.editing = true;

        this.input.nativeElement.focus();
    };

    save() {
        if (this.editing) {
            if (this.ignoreBlanks && !this.value) {
                this.value = this.oldValue;
            }
            
            if (this.value !== this.oldValue) {
                if (this.done) {
                    this.done.emit(this.value);
                }
            }
        }

        this.editing = false;
    }

}