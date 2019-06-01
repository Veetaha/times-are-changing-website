import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RouteMap } from '@app/common/route-map.class';
import { AllUsersComponent } from './all-users/all-users.component';

const routes = [
    {
        path:      'users',
        component: AllUsersComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { 
    static readonly routeMap = new RouteMap(routes);
}