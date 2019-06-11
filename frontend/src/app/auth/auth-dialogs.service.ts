import { Injectable } from '@angular/core';
import { TdDialogService } from '@covalent/core/dialogs';
import { Store } from '@ngxs/store';

import { SignOut } from './auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthDialogsService {

    constructor(
        private readonly dialogs: TdDialogService,
        private readonly store:   Store
    ){}

    /** 
     * Shows a confirmation dialog for the client to sign out 
     * Pre: client must be authenticated before calling this method.
     */
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