import { Component  } from '@angular/core';
import { Store } from '@ngxs/store';

import { AuthState } from '@app/auth/auth.state';
import { SignOut   } from '@app/auth/auth.actions';
import { AuthRoutingModule } from '@app/auth/auth-routing.module';

@Component({
    selector:    'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls:  ['./dashboard.component.scss']
})
export class DashboardComponent {
    readonly authRouteMap         = AuthRoutingModule.routeMap;
    readonly client$              = AuthState.selectClient(this.store);

    constructor(private readonly store: Store) {}
    
    signOut() {
        this.store.dispatch(SignOut.instance);
    }
}