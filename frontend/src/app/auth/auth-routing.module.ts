import { NgModule     } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SignInComponent   } from './sign-in/sign-in.component';
import { AuthGuard         } from './auth.guard';
import { SignUpComponent   } from './sign-up/sign-up.component';
import { authRouteAcessMap } from './auth-routing.limits';

const canActivate = [AuthGuard];

const routes = [
    {
        path:      'sign-in',
        component: SignInComponent,
        data:      authRouteAcessMap.getRoleLimitFor('sign-in'),
        canActivate
    },
    {
        path:      'sign-up',
        component: SignUpComponent,
        data:      authRouteAcessMap.getRoleLimitFor('sign-up'),
        canActivate
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }