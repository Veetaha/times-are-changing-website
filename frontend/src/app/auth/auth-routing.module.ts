import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserRole } from '@app/gql/generated';
import { RouteMap } from '@app/common/route-map.class';

import { SignInComponent } from './sign-in/sign-in.component';
import { AuthGuard       } from './auth.guard';
import { allow           } from './user-role-limit.obj';
import { SignUpComponent } from './sign-up/sign-up.component';

// @dynamic
const canActivate = [AuthGuard];

const routes = [
    {
        path:      'sign-in',
        component: SignInComponent,
        data:      allow(UserRole.Guest),
        canActivate
    },
    {
        path:      'sign-up',
        component: SignUpComponent,
        data:      allow(UserRole.Guest),
        canActivate
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { 
    static readonly routeMap = new RouteMap(routes);
}