import _ from 'lodash';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { TdDialogService } from '@covalent/core/dialogs';

import { trackById           } from '@utils/track-by-id';
import { Success             } from '@app/common/common.actions';
import { PageFetcherFn       } from '@app/common/pagination/pagination.interfaces';
import { SortingOrder        } from '@app/gql/generated';
import { SetFab, DeleteFab   } from '@app/fab/fab.actions';
import { CriticalError       } from '@app/error/error.actions';
import { PaginationComponent } from '@app/common/pagination/pagination.component';

import { PagedNews          } from '../news.interfaces';
import { NewsService        } from '../news.service';
import { newsRouteAccessMap } from '../news-routing.limits';


@Component({
    selector:    'app-all-news',
    templateUrl: './all-news.component.html',
    styleUrls:  ['./all-news.component.scss']
})
export class AllNewsComponent implements OnDestroy {
    @ViewChild('paginator') paginator!: PaginationComponent<PagedNews>;

    trackById = trackById;

    newsPageFetcher: PageFetcherFn<PagedNews> = ({limit, offset, search}) => { 
        return this.news.getNewsPage({ 
            limit,
            offset,
            sort: { creationDate: { ordering: SortingOrder.Desc } },
            filter: !search ? void 0 : { props: { title: { ilike: search } } }
        });
    }

    constructor(
        private readonly news:    NewsService,
        private readonly store:   Store,
        private readonly dialogs: TdDialogService
    ) { 
        this.store.dispatch(new SetFab({
            fabIcon: 'add',
            roleLimit: newsRouteAccessMap.getRoleLimitFor('news/create'),
            routerLink: 'news/create',
            tooltip: 'Create news'
        }));
    }
    ngOnDestroy() {
        this.store.dispatch(DeleteFab.instance);
    }

    // TODO: disable deleting news while waiting for server response
    async deleteNews(news: PagedNews) {
        const confirmed = await this.dialogs.openConfirm({
            message: `Are you sure you want to delete news "${news.title}"?`,
            title: 'AHTUNG!',
            acceptButton: 'Yes',
            cancelButton: 'Cancel'
        }).afterClosed().toPromise();
        if (!confirmed) {
            return;
        }
        const newsTitle = news.title;
        this.news.deleteNewsById(news.id).subscribe(
            () => {
                this.store.dispatch(new Success(`Successfully deleted news "${newsTitle}"`));
                this.paginator.updateDueToPageItemsRemoved(1);
            },
            err => this.store.dispatch(new CriticalError(
                `Failed to delete news "${newsTitle}": ${err.message}`
            ))
        );
    }

    
}