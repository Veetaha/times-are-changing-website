import { Store           } from '@ngxs/store';
import { Component       } from '@angular/core';
import { TdDialogService } from '@covalent/core/dialogs';

import { AuthState         } from '@app/auth/auth.state';
import { SignOut           } from '@app/auth/auth.actions';
import { authRouteAcessMap } from '@app/auth/auth-routing.limits';

@Component({
    selector:    'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls:  ['./dashboard.component.scss']
})
export class DashboardComponent {

    readonly signInRouteLimit = authRouteAcessMap.getRoleLimitFor('sign-in');
    readonly signUpRouteLimit = authRouteAcessMap.getRoleLimitFor('sign-up');

    readonly client$ = AuthState.selectClient(this.store);

    constructor(
        private readonly dialogs: TdDialogService,
        private readonly store: Store
    ) {}
    
    trySignOut() {
        this.dialogs.openConfirm({
            message: 'Are you sure you want to sign out?',
            title: 'AHTUNG!',
            acceptButton: 'Yes',
            cancelButton: 'Cancel'
        }).afterClosed().subscribe(confirmed => {
            if (confirmed) this.store.dispatch(SignOut.instance);
        });
    }
}