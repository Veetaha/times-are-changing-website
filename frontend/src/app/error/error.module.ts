import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { NotFoundComponent  } from './not-found.component';
import { GlobalErrorHandler } from './global-error.handler';
import { ErrorRoutingModule } from './error-routing.module';
import { ErrorState         } from './error.state';

@NgModule({
    imports: [
        CommonModule,
        ErrorRoutingModule,
        NgxsModule.forFeature([ErrorState])
    ],
    providers: [
        {
            provide:  ErrorHandler, 
            useClass: GlobalErrorHandler
        }
    ],
    declarations: [NotFoundComponent],
    exports:      [
        ErrorRoutingModule,
        NotFoundComponent
    ]
})
export class ErrorModule {}