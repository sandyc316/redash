import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
	term: "";
    logoUrl: "logoUrl";
    basePath: "/"; //clientConfig.basePath;
    currentUser: any ; //currentUser;
    showQueriesMenu: true; //currentUser.hasPermission('view_query');
    // showAlertsLink: currentUser.hasPermission('list_alerts');
    showNewQueryMenu: true; //currentUser.hasPermission('create_query');
    showSettingsMenu: true; //currentUser.hasPermission('list_users');
    showDashboardsMenu: true; //currentUser.hasPermission('list_dashboards');
    isNavOpen: boolean;

    dashboards: any = [];
    queries: any = [];

    constructor(/*currentUser, clientConfig, Dashboard, Query*/) {
    	this.currentUser = {
    		hasPermission: function(a) {return true},
	    	isAdmin: true,
	    	profile_image_url: "",
	    	name: "Sandeep"
	    }
    }

    ngOnInit() {
    
    }

    // this.reload = () => {
    //     logger('Reloading dashboards and queries.');
        
    //     Dashboard.favorites().$promise.then((data) => {
    //         this.dashboards = data.results;
    //     });

    //     Query.favorites().$promise.then((data) => {
    //         this.queries = data.results;
    //     });
    // };

    // this.reload();

    // $rootScope.$on('reloadFavorites', this.reload);

    newDashboard() {
        // $uibModal.open({
        //         component: 'editDashboardDialog',
        //         resolve: {
        //         dashboard: () => ({ name: null, layout: null }),
        //     },
        // });
    };

    searchQueries() {
        // $location.path('/queries').search({ q: this.term });
        // $route.reload();
    };

    logout() {
        // Auth.logout();
    };
    

    // logout() { this.logoutClick.emit(); }

}