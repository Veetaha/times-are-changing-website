import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthModule   } from '@app/auth/auth.module';
import { CommonModule } from '@app/common/common.module';

import { DashboardComponent } from './dashboard.component';
import { DashboardAnchorComponent } from './dashboard-anchor/dashboard-anchor.component';


@NgModule({
    imports: [
        CommonModule,
        AuthModule,
        RouterModule
    ],
    declarations: [
        DashboardComponent,
        DashboardAnchorComponent
    ],
    exports: [
        DashboardComponent
    ]
})
export class DashboardModule {}