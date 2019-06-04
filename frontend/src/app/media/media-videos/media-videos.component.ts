import _ from 'lodash';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector:    'app-media-videos',
    templateUrl: './media-videos.component.html',
    styleUrls:  ['./media-videos.component.scss']
})
export class MediaVideosComponent {
    constructor(private readonly sanitizer: DomSanitizer) {}

    readonly ytVideoSrcs = [
        "https://www.youtube.com/embed/duqLf1Orf0s",
        "https://www.youtube.com/embed/TYG6m9Q7oOw"
    ].map(url => this.sanitizer.bypassSecurityTrustResourceUrl(url));
}