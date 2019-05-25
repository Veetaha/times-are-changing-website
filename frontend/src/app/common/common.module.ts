import { NgModule        } from '@angular/core';
import { BrowserModule   } from '@angular/platform-browser';
import { UcWidgetModule  } from 'ngx-uploadcare-widget';
import { ClipboardModule } from 'ngx-clipboard';

import { VeeModule     } from '@utils/vee/vee.module';
import { GraphQLModule } from '@app/gql/gql.module';

import { CommonNgxsModule     } from './common-ngxs.module';
import { CommonMaterialModule } from './common-material.module';
import { CommonCovalentModule } from './common-covalent.module';

import { UploadImageComponent    } from './upload-image/upload-image.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';

const reexports = [
    VeeModule,
    BrowserModule, 
    GraphQLModule,
    CommonNgxsModule,   
    CommonMaterialModule,
    CommonCovalentModule,
    UcWidgetModule,
    ClipboardModule
];

@NgModule({
    imports: reexports,
    declarations: [
        UploadImageComponent,
        SnackBarComponent
    ],
    exports: [
        ...reexports,
        UploadImageComponent,
        SnackBarComponent
    ],
    entryComponents: [
        SnackBarComponent
    ]
})
export class CommonModule { }