import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthModule   } from '@app/auth/auth.module';
import { CommonModule } from '@app/common/common.module';
import { UserModule   } from '@app/user/user.module';

import { DashboardComponent } from './dashboard.component';
import { DashboardAnchorComponent } from './dashboard-anchor/dashboard-anchor.component';
import { DashboardClientProfileComponent } 
from './dashboard-client-profile/dashboard-client-profile.component';


@NgModule({
    imports: [
        CommonModule,
        AuthModule,
        RouterModule,
        UserModule
    ],
    declarations: [
        DashboardComponent,
        DashboardAnchorComponent,
        DashboardClientProfileComponent
    ],
    exports: [
        DashboardComponent
    ]
})
export class DashboardModule {}