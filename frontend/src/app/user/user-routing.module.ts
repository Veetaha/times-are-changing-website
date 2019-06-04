import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
export class UserRoutingModule { }