import { NgModule } from '@angular/core';

import { CommonModule } from '@app/common/common.module';

import { AllUsersComponent    } from './all-users/all-users.component';
import { UserRoutingModule    } from './user-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserAvatarComponent  } from './user-avatar/user-avatar.component';
import { UserRoleComponent    } from './user-role/user-role.component';

@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule
    ],
    declarations: [
        AllUsersComponent,
        UserProfileComponent,
        UserAvatarComponent,
        UserRoleComponent
    ],
    exports: [
        UserRoutingModule,
        UserProfileComponent,
        UserAvatarComponent
    ]
})
export class UserModule {}