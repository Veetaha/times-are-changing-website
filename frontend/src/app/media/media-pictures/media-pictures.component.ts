import _ from 'lodash';
import { Component } from '@angular/core';
import { Gallery, ImageItem, GalleryRef } from '@ngx-gallery/core';
import { Lightbox } from '@ngx-gallery/lightbox';
import { take } from 'rxjs/operators';

@Component({
    selector:    'app-media-pictures',
    templateUrl: './media-pictures.component.html',
    styleUrls:  ['./media-pictures.component.scss']
})
export class MediaPicturesComponent {
    readonly galleryRef: GalleryRef;
    readonly galleryId = 'MediaPictures';
    // 6 screenshots from '/assets/' dir, update this counter when amount of 
    // pictures that need to be display in this gallery changes
    readonly images = _.times(7, i => { 
        const imgUrl = `/assets/img/game-screenshot${i + 1}.jpg`;
        return new ImageItem({ src: imgUrl, thumb: imgUrl });
    });

    constructor(
        private readonly lightboxes: Lightbox, 
        galleries: Gallery
    ) {
        this.galleryRef = galleries.ref(this.galleryId);
        this.galleryRef.setConfig({ 
            loadingStrategy: 'preload', // TODO: change to 'lazy' when gallery gets big
            thumbPosition:   'left'
        });
        this.galleryRef.load(this.images);
    }

    onWheel = _.throttle(
        (e: WheelEvent) => {
            if      (e.deltaY > 0) this.galleryRef.next();
            else if (e.deltaY < 0) this.galleryRef.prev();
        },
        /* throttle time */     400,
        { leading: true }
    );

    async openLightbox(index: number) {
        this.lightboxes.open(index, this.galleryId, {
            panelClass: 'fullscreen'
        });

        document.addEventListener('wheel', this.onWheel);

        await this.lightboxes.closed.pipe(take(1)).toPromise();

        document.removeEventListener('wheel', this.onWheel);
    }
}