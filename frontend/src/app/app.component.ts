import { Component,  } from '@angular/core';
import { Store } from '@ngxs/store';

import { CommonState } from './common/common.state';

@Component({
    selector:    'app-root',
    templateUrl: './app.component.html',
    styleUrls:  ['./app.component.scss']
})
export class AppComponent {
    isAwaitingResponses$ = this.store.select(CommonState.isAwaitingResponses);

    constructor(private readonly store: Store) {}
}

