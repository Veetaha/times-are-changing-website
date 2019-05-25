import { OnDestroy    } from '@angular/core';
import { Subscription } from 'rxjs';

export abstract class Disposable implements OnDestroy {
    private readonly handles = new Array<Subscription>();

    ngOnDestroy() {
        this.handles.forEach(handle => {
            if (!handle.closed) handle.unsubscribe();
        });
    }

    addHandle(subscription: Subscription) {
        this.handles.push(subscription);
    }

    getHandles() {
        return this.handles;
    }
}