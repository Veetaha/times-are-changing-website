import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GalleryModule, GALLERY_CONFIG, GalleryConfig } from '@ngx-gallery/core';
import { LightboxModule, LightboxConfig, LIGHTBOX_CONFIG } from '@ngx-gallery/lightbox';

const galleryConfig: GalleryConfig = {
    // determinate mode is currently broken  
    // see https://github.com/MurhafSousli/ngx-gallery/issues/269
    loadingMode: 'indeterminate' 
};
const lightboxConfig: LightboxConfig = {    
    keyboardShortcuts: true
};

@NgModule({
    exports: [ 
        BrowserAnimationsModule,
        GalleryModule,
        LightboxModule
    ],
    providers: [
        { provide: GALLERY_CONFIG,  useValue: galleryConfig  },
        { provide: LIGHTBOX_CONFIG, useValue: lightboxConfig }
    ]
})
export class CommonGalleryModule {}