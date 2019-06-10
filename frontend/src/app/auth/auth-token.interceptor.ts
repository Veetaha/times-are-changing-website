import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store      } from '@ngxs/store';

import { AwaitResponse } from '@app/common/common.actions';

import { AuthState } from './auth.state';
import { finalize  } from 'rxjs/operators';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

    constructor(private readonly store: Store) {}

    // TODO filter only requests to the native host domain
    intercept(req: HttpRequest<unknown>, next: HttpHandler) {
        this.store.dispatch(new AwaitResponse(true));

        const token = this.store.selectSnapshot(AuthState.token);
        return next.handle(token != null
            ? req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) })
            : req
        ).pipe(finalize(() => this.store.dispatch(new AwaitResponse(false))));
    }

    
}