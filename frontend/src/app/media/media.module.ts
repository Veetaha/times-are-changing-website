import { NgModule } from '@angular/core';

import { CommonModule } from '@app/common/common.module';

import { MediaRoutingModule     } from './media-routing.module';
import { MediaComponent         } from './media.component';
import { MediaPicturesComponent } from './media-pictures/media-pictures.component';
import { MediaVideosComponent   } from './media-videos/media-videos.component';

@NgModule({
    imports: [
        CommonModule,
        MediaRoutingModule
    ],
    declarations: [
        MediaComponent,
        MediaPicturesComponent,
        MediaVideosComponent
    ]
})
export class MediaModule {

}