import { Store     } from '@ngxs/store';
import { Component } from '@angular/core';

import { AuthState } from '@app/auth/auth.state';


@Component({
    selector:    'app-dashboard-client-profile',
    templateUrl: './dashboard-client-profile.component.html',
    styleUrls:  ['./dashboard-client-profile.component.scss']
})
export class DashboardClientProfileComponent {
    client$ = AuthState.selectClient(this.store);

    constructor(private readonly store: Store) {}
}