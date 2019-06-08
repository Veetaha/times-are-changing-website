import { NgModule         } from '@angular/core';
import { BrowserModule    } from '@angular/platform-browser';
import { UcWidgetModule   } from 'ngx-uploadcare-widget';
import { ClipboardModule  } from 'ngx-clipboard';

import { VeeModule     } from '@utils/vee/vee.module';
import { GraphQLModule } from '@app/gql/gql.module';

import { CommonNgxsModule     } from './common-ngxs.module';
import { CommonMaterialModule } from './common-material.module';
import { CommonCovalentModule } from './common-covalent.module';

import { UploadImageComponent } from './image/upload-image/upload-image.component';
import { SnackBarComponent    } from './snack-bar/snack-bar.component';
import { PaginationModule     } from './pagination/pagination.module';
import { RatingComponent      } from './rating/rating.component';

const reexports = [
    VeeModule,
    BrowserModule, 
    GraphQLModule,
    CommonNgxsModule,   
    CommonMaterialModule,
    CommonCovalentModule,
    UcWidgetModule,
    ClipboardModule,
    PaginationModule
];

@NgModule({
    imports: reexports,
    declarations: [
        UploadImageComponent,
        SnackBarComponent,
        RatingComponent
    ],
    exports: [
        ...reexports,
        UploadImageComponent,
        SnackBarComponent,
        RatingComponent
    ],
    entryComponents: [
        SnackBarComponent
    ]
})
export class CommonModule { }