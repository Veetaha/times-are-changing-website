import { Component } from '@angular/core';
import { Store     } from '@ngxs/store';

import { UserRoleLimit } from '@app/auth/user-role-limit.obj';
import { UserRole      } from '@app/gql/generated';
import { AuthState     } from '@app/auth/auth.state';

import { FabState      } from './fab.state';
import { FabStateModel } from './fab.model';
import { FabClicked, DeleteFab } from './fab.actions';

@Component({
    selector:    'app-fab',
    templateUrl: './fab.component.html',
    styleUrls:  ['./fab.component.scss']
})
export class FabComponent {

    readonly fab$        = this.store.select(FabState.fab);
    readonly clientRole$ = AuthState.selectClientRole(this.store);

    constructor(private readonly store: Store) {
        
    }
    deleteFab() {
        this.store.dispatch(DeleteFab.instance);
    }

    dispatchClickAction() {
        this.store.dispatch(FabClicked.instance);
    }

    shouldDisplayFab(fab: FabStateModel, clientRole: UserRole) {
        return fab.fabIcon != null && (
            fab.roleLimit == null ||                            // case no  role limit
            UserRoleLimit.obeysLimit(fab.roleLimit, clientRole) // case has role limit
        );
    }

}
