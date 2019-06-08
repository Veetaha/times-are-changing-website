import { Observable } from 'rxjs';
import { map        } from 'rxjs/operators';
import { Store      } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { CriticalError } from '@app/error/error.actions';


import { UserService } from '../user.service';

/**
 * Prefetches user data before navigating to the user profile page.
 */
@Injectable({ providedIn: 'root' })
export class UserProfileResolverService implements Resolve<void> {
    constructor(
        private readonly users: UserService,
        private readonly store: Store
    ) {}

    resolve(route: ActivatedRouteSnapshot): void | Observable<any> {
        const userLogin = route.paramMap.get('login')!;
        return this.users.getUserByLogin(userLogin).pipe(map(user => 
            user == null 
                ? this.failWithMessage(`Failed to fetch user #${userLogin}`)
                : user
        ));        
    }

    private failWithMessage(message: string) {
        this.store.dispatch(new CriticalError(message));
    }
}