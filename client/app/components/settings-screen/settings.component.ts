import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'settings-screen',
    templateUrl: './settings.component.html',
    // styleUrls: ['./header.component.scss']
})
export class SettingsScreenComponent {
    @Input() item: any;

    constructor() {
    }

    ngOnInit() {
    
    }

    // this.settingsMenu = settingsMenu;
    //   this.isActive = (menuItem) => {
    //     if (isFunction(menuItem.isActive)) {
    //       return menuItem.isActive($location);
    //     }
    //     return $location.path().startsWith(menuItem.pathPrefix);
    //   };
    //   this.isAvailable = permission => permission === undefined || currentUser.hasPermission(permission);

    // toggleItem($event, item) {
    //     $event.preventDefault();
    //     $event.stopPropagation();
        
    //     if (item) {
    //         if (item.is_favorite) {
    //             // item.$unfavorite().then(() => {
    //                 item.is_favorite = false;
    //                 // $rootScope.$broadcast('reloadFavorites');
    //             // });
    //         } else {
    //             // item.$favorite().then(() => {
    //                 item.is_favorite = true;
    //                 // $rootScope.$broadcast('reloadFavorites');
    //             // });
    //         }
    //     }
    // };

}