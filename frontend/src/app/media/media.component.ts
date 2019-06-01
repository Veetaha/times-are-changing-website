import _ from 'lodash';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector:    'app-media',
    templateUrl: './media.component.html',
    styleUrls:  ['./media.component.scss']
})
export class MediaComponent {
    constructor(private readonly sanitizer: DomSanitizer) {}

    readonly screenshotSrcs = _.times(6, i => `/assets/game-screenshot${i + 1}.jpg`);
    readonly ytVideoSrcs = [
        "https://www.youtube.com/embed/TYG6m9Q7oOw",
        "https://www.youtube.com/embed/duqLf1Orf0s" 
    ].map(url => this.sanitizer.bypassSecurityTrustResourceUrl(url));
}