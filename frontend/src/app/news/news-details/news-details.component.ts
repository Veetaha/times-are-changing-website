import _ from 'lodash';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';

import { UserRole } from '@app/gql/generated';
import { ImageService } from '@app/common/image/image.service';
import { RatingUpdater } from '@app/common/rating/rating.component';
import { SetFab, DeleteFab } from '@app/fab/fab.actions';

import { EntireNews } from '../news.interfaces';
import { NewsService } from '../news.service';

@Component({
    selector:    'app-news-details',
    templateUrl: './news-details.component.html',
    styleUrls:  ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit, OnDestroy {
    news!: EntireNews;
    newsRatingUpdater: RatingUpdater = newRating => {
        return newRating == null 
            ? this.newsService.deleteNewsRating(this.news.id)
            : this.newsService.rateNews(this.news.id, newRating.hasLiked)
    }

    constructor(
        private readonly route: ActivatedRoute,
        private readonly store: Store,
        private readonly newsService: NewsService,
        readonly images: ImageService,
    ) {
        this.store.dispatch(new SetFab({
            fabIcon: 'edit',
            roleLimit: { roles: [UserRole.Admin], areAllowed: true },
            tooltip: 'Edit news'
        }));
    }

    ngOnDestroy() {
        this.store.dispatch(DeleteFab.instance);
    }

    ngOnInit() {
        // Obtained through `NewsDetailsResolver`
        // Clone this data because it gets `Object.freeze()` by '@ngxs/router-plugin',
        // But we need to modify at least its rating counts
        this.news = _.cloneDeep(this.route.snapshot.data.news);
    }

}