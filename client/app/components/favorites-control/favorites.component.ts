import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'favrites-control',
    templateUrl: './favorites.component.html',
    // styleUrls: ['./header.component.scss']
})
export class FavoritesComponent {
    @Input() 
    set item(item) {
        this._item = item;
        
        if (item.is_favorite) {
            this.setAsFav();
        } else {
            this.removeAsFav();
        }
    }

    @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

    _item: any;
    isFav: boolean = false;
    title: string = "Add to favorites";
    class: string = "fa-star-o";

    constructor() {
    }

    ngOnInit() {
    
    }

    toggleItem($event, item) {
        $event.preventDefault();
        $event.stopPropagation();

        if (this._item) { 
            if (this._item.is_favorite) {
                this._item.is_favorite = false;
                this.removeAsFav();

            } else {
                this._item.is_favorite = true;
                this.setAsFav();
            }
        }

        if (this.onClick)
            this.onClick.emit();
    };

    setAsFav() {
        this.isFav = true;
        this.title = "Remove from favorites";
        this.class = "fa-star";
    }

    removeAsFav() {
        this.isFav = false;
        this.title = "Add to favorites";
        this.class = "fa-star-o";
    }

}