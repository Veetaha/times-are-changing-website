import _ from 'lodash';
import { map } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { Nullable } from 'ts-typedefs';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthState         } from '@app/auth/auth.state';
import { UserRole          } from '@app/gql/generated';
import { Disposable        } from '@utils/disposable';
import { ConfigService     } from '@app/config/config.service';
import { DeleteFab, SetFab } from '@app/fab/fab.actions';

import { EntireUser  } from '../user.interfaces';

@Component({
    selector:    'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls:  ['./user-profile.component.scss']
})
export class UserProfileComponent extends Disposable implements OnInit, OnDestroy
{

    user$!: Observable<EntireUser>;
    client$ = AuthState.selectClient(this.store);

    readonly dateFormat: string;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly store: Store,
        config: ConfigService
    ) {
        super();
        this.dateFormat = config.dateFormat;
    }

    canClientMutateUser(client: Nullable<EntireUser>, user: EntireUser) {
        return client != null && (
            client.role === UserRole.Admin || client.login === user.login
        );
    }

    ngOnInit() {
        // Obtained through `UserDetailsResolver`
        // Clone this data because it gets `Object.freeze()` by '@ngxs/router-plugin',
        // But we need to modify it if client makes some edits to this profile. 
        this.user$ = this.route.data.pipe(map(d => _.cloneDeep(d.user)));
        
        this.addHandle(combineLatest(this.client$, this.user$).subscribe(([client, user]) =>
            this.store.dispatch(this.canClientMutateUser(client, user)
               ? new SetFab({ fabIcon: 'edit', tooltip: 'Edit profile' })
               : DeleteFab.instance
            )
        ));
    }

    ngOnDestroy() {
        this.store.dispatch(DeleteFab.instance);
    }

}