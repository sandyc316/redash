
import { Injectable } from '@angular/core';

const SESSION_ITEM = 'session';
const session = { loaded: false };

function storeSession(sessionData) {
    console.log('Updating session to be:', sessionData);
    Object.assign(session, sessionData, { loaded: true });
}

function getLocalSessionData() {
    if (session.loaded) {
        return session;
    }

    const sessionData = window.sessionStorage.getItem(SESSION_ITEM);
    if (sessionData) {
        storeSession(JSON.parse(sessionData));
    }

    return session;
}


@Injectable()
export class CurrentUser {
    id: any;
    permissions: any;

    constructor() {
        const sessionData = getLocalSessionData();
        // console.log(sessionData);
        // super();
    }

    canEdit(object) {
        const userId = object.user_id || (object.user && object.user.id);
        
        return this.hasPermission('admin') || (userId && (userId === this.id));
    };

    hasPermission(permission) {
        return this.permissions.indexOf(permission) !== -1;
    }

    isAdmin() {
        return this.hasPermission('admin');
    } 
}
