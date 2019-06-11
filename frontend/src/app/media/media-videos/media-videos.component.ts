import _ from 'lodash';
import { Component } from '@angular/core';
import { Gallery, GalleryRef } from '@ngx-gallery/core';
import { Lightbox } from '@ngx-gallery/lightbox';
// import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector:    'app-media-videos',
    templateUrl: './media-videos.component.html',
    styleUrls:  ['./media-videos.component.scss']
})
export class MediaVideosComponent {
    readonly ytVideoIds = [ 
        "VATzardz85g",
        "duqLf1Orf0s", 
        "TYG6m9Q7oOw"
    ];
    readonly galleryId = 'MediaVideos';
    readonly galleryRef: GalleryRef;

    constructor(
        private readonly lightboxes: Lightbox,
        galleries: Gallery,
    ) {
        this.galleryRef = galleries.ref(this.galleryId);
        this.ytVideoIds.forEach(src => this.galleryRef.addYoutube({ src }));
    }

    openLightbox(i: number) {
        this.lightboxes.open(i, this.galleryId, {
            panelClass: 'fullscreen'
        });
    }
}