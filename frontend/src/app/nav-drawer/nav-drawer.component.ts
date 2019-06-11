import { Component } from '@angular/core';
import { Store     } from '@ngxs/store';

import { AuthState                      } from '@app/auth/auth.state';
import { AuthDialogsService             } from '@app/auth/auth-dialogs.service';

@Component({
    selector:    'app-nav-drawer',
    templateUrl: './nav-drawer.component.html',
    styleUrls:  ['./nav-drawer.component.scss']
})
export class NavDrawerComponent {

    client$ = AuthState.selectClient(this.store);

    constructor(
        private readonly store:       Store,
        private readonly authDialogs: AuthDialogsService
    ) {}   


    trySignOut() {
        this.authDialogs.trySignOut();
    }
}