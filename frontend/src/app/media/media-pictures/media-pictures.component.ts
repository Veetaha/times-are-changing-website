import _ from 'lodash';
import { Component } from '@angular/core';

@Component({
    selector:    'app-media-pictures',
    templateUrl: './media-pictures.component.html',
    styleUrls:  ['./media-pictures.component.scss']
})
export class MediaPicturesComponent {
    readonly screenshotSrcs = _.times(6, i => `/assets/game-screenshot${i + 1}.jpg`);
}