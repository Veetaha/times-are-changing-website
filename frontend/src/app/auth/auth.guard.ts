import { Injectable } from '@angular/core';
import { Store      } from '@ngxs/store';
import { map        } from 'rxjs/operators';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { UserRole } from '@app/gql/generated';

import { AuthState } from './auth.state';
import { UserRoleLimit } from './user-role-limit.obj';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private readonly store: Store) {}

    canActivate(route: ActivatedRouteSnapshot) {
        return AuthState.selectClientRole(this.store).pipe(map(
            clientRole => this.tryGrantAccess(route.data as UserRoleLimit, clientRole)
        ));
    }

    private tryGrantAccess(roleLimit: UserRoleLimit, clientRole: UserRole) {
        if (UserRoleLimit.obeysLimit(roleLimit, clientRole)) {
            return true;
        }
        throw new Error('You have no rights to access this route');
    }
}