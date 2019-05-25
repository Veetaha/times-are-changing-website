import { Component } from '@angular/core';
import { Store     } from '@ngxs/store';

import { AuthState } from '@app/auth/auth.state';
import { Info } from '@app/common/common.actions';

@Component({
    selector:    'app-developer',
    templateUrl: './developer.component.html',
    styleUrls:  ['./developer.component.scss']
})
export class DeveloperComponent {

    clientAuthToken$ = this.store.select(AuthState.token);

    constructor(private readonly store: Store) {}

    notifyTokenCopied() {
        this.store.dispatch(new Info(
            "Your auth token was copied to clipboard",
            "Updated clipboard"
        ));
    }
}
