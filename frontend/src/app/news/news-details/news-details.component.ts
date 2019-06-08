import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';

import { UserRole } from '@app/gql/generated';
import { ImageService } from '@app/common/image/image.service';
import { SetFab, DeleteFab } from '@app/fab/fab.actions';

import { EntireNews } from '../news.interfaces';

@Component({
    selector:    'app-news-details',
    templateUrl: './news-details.component.html',
    styleUrls:  ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit, OnDestroy {
    news!: EntireNews;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly store: Store,
        public readonly images: ImageService,
    ) {
        this.store.dispatch(new SetFab({
            fabIcon: 'edit',
            roleLimit: { roles: [UserRole.Admin], areAllowed: true }
        }));
    }

    ngOnDestroy() {
        this.store.dispatch(DeleteFab.instance);
    }

    ngOnInit() {
        // Obtained through `NewsDetailsResolver`
        this.news = this.route.snapshot.data.news as EntireNews;
    }

}