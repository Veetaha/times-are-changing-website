import { NgModule } from '@angular/core';

import { CommonModule } from '@app/common/common.module';

import { AllUsersComponent } from './all-users/all-users.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule
    ],
    exports: [
        UserRoutingModule
    ],
    declarations: [
        AllUsersComponent
    ]
})
export class UserModule {}