import { NgModule     } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@app/common/common.module';

import { NavDrawerComponent     } from './nav-drawer.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        NavDrawerComponent
    ],
    exports: [
        NavDrawerComponent
    ]
})
export class NavDrawerModule {
}