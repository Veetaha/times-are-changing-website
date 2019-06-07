import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EntireNews } from '../news.interfaces';
import { ImageService } from '@app/common/image/image.service';

@Component({
    selector:    'app-news-details',
    templateUrl: './news-details.component.html',
    styleUrls:  ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {
    news!: EntireNews;

    constructor(
        private readonly route: ActivatedRoute,
        public readonly images: ImageService
    ) {}

    ngOnInit() {
        // Obtained through `NewsDetailsResolver`
        this.news = this.route.snapshot.data.news as EntireNews;
    }
}