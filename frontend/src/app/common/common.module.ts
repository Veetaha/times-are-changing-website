import { NgModule        } from '@angular/core';
import { BrowserModule   } from '@angular/platform-browser';
import { UcWidgetModule  } from 'ngx-uploadcare-widget';
import { ClipboardModule } from 'ngx-clipboard';
import { AgmCoreModule   } from '@agm/core';

import { VeeModule     } from '@utils/vee/vee.module';
import { GraphQLModule } from '@app/gql/gql.module';
import { ConfigService } from '@app/config/config.service';

import { CommonNgxsModule     } from './common-ngxs.module';
import { CommonMaterialModule } from './common-material.module';
import { CommonCovalentModule } from './common-covalent.module';
import { CommonGalleryModule  } from './common.gallery.module';

import { UploadImageComponent } from './image/upload-image/upload-image.component';
import { SnackBarComponent    } from './snack-bar/snack-bar.component';
import { PaginationModule     } from './pagination/pagination.module';
import { RatingComponent      } from './rating/rating.component';

const reexports = [
    CommonGalleryModule,
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
    imports: [
        ...reexports,
        AgmCoreModule.forRoot({ apiKey: ConfigService.googleMapsApiKey })
    ],
    declarations: [
        UploadImageComponent,
        SnackBarComponent,
        RatingComponent
    ],
    exports: [
        ...reexports,
        AgmCoreModule,
        UploadImageComponent,
        SnackBarComponent,
        RatingComponent
    ],
    entryComponents: [
        SnackBarComponent
    ]
})
export class CommonModule { }