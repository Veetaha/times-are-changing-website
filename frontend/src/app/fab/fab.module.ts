import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { CommonModule } from '@app/common/common.module';
import { AuthModule   } from '@app/auth/auth.module';

import { FabComponent } from './fab.component';
import { FabState } from './fab.state';

@NgModule({
    imports: [
        CommonModule,
        AuthModule,
        NgxsModule.forFeature([FabState])
    ],
    declarations: [
        FabComponent
    ],
    exports: [
        FabComponent
    ]
})
export class FabModule {
}