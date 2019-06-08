import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AllUsersComponent          
} from './all-users/all-users.component';
import { UserProfileComponent       } from './user-profile/user-profile.component';
import { UserProfileResolverService } from './user-profile/user-profile-resolver.service';

const routes = [
    {
        path:      'users/:login',
        component: UserProfileComponent,
        resolve: {
            user: UserProfileResolverService
        }
    },
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