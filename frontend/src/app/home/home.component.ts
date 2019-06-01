import _ from 'lodash';
import { Component } from '@angular/core';

@Component({
    selector:    'app-home',
    templateUrl: './home.component.html',
    styleUrls:  ['./home.component.scss']
})
export class HomeComponent {
    readonly carouselImageSrcs = _.times(6, i => `/assets/game-screenshot${i + 1}.jpg`);
}