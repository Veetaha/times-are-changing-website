import { Component,  } from '@angular/core';
import { Store } from '@ngxs/store';

import { CommonState } from './common/common.state';
import { delay } from 'rxjs/operators';

@Component({
    selector:    'app-root',
    templateUrl: './app.component.html',
    styleUrls:  ['./app.component.scss']
})
export class AppComponent {
    // FIXME: using delay(0) workaround because of `ExpressionChangedAfterItHasBeenCheckedError`
    // This error arises in `<media-pictures>` gallery component.
    isAwaitingResponses$ = this.store
        .select(CommonState.isAwaitingResponses).pipe(delay(0));

    constructor(private readonly store: Store) {}
}

