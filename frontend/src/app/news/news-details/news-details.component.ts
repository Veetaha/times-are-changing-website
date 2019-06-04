import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EntireNews } from '../news.interfaces';

@Component({
    selector:    'app-news-details',
    templateUrl: './news-details.component.html',
    styleUrls:  ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {
    news!: EntireNews;

    constructor(private readonly route: ActivatedRoute) {}

    ngOnInit() {
        this.news = this.route.snapshot.data.news as EntireNews;
    }
}