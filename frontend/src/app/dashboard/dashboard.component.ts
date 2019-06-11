import { Store              } from '@ngxs/store';
import { Component          } from '@angular/core';

import { AuthState         } from '@app/auth/auth.state';
import { AuthDialogsService } from '@app/auth/auth-dialogs.service';


@Component({
    selector:    'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls:  ['./dashboard.component.scss']
})
export class DashboardComponent {   
    readonly client$ = AuthState.selectClient(this.store);

    constructor(
        private readonly store:       Store,
        private readonly authDialogs: AuthDialogsService
    ) {}
    
    trySignOut() {
        this.authDialogs.trySignOut();
    }
}