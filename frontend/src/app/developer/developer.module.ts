import { NgModule } from '@angular/core';

import { CommonModule } from '@app/common/common.module';

import { DeveloperRoutingModule } from './developer-routing.module';
import { DeveloperComponent     } from './developer/developer.component';

@NgModule({
    imports: [
        CommonModule,
        DeveloperRoutingModule   
    ],
    declarations: [DeveloperComponent],
})
export class DeveloperModule { }
