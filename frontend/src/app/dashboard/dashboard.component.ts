import { Component  } from '@angular/core';
import { Store } from '@ngxs/store';

import { AuthState } from '@app/auth/auth.state';
import { SignOut   } from '@app/auth/auth.actions';
import { AuthRoutingModule } from '@app/auth/auth-routing.module';
import { TdDialogService } from '@covalent/core/dialogs';

@Component({
    selector:    'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls:  ['./dashboard.component.scss']
})
export class DashboardComponent {
    readonly authRouteMap = AuthRoutingModule.routeMap;
    readonly client$      = AuthState.selectClient(this.store);

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