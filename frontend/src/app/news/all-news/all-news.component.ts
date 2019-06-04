import { Component } from '@angular/core';

import { PageFetcherFn } from '@app/common/pagination/pagination.interfaces';
import { SortingOrder  } from '@app/gql/generated';
import { trackById     } from '@utils/track-by-id';

import { PagedNews          } from '../news.interfaces';
import { NewsService        } from '../news.service';
import { newsRouteAccessMap } from '../news-routing.limits';


@Component({
    selector:    'app-all-news',
    templateUrl: './all-news.component.html',
    styleUrls:  ['./all-news.component.scss']
})
export class AllNewsComponent {
    trackById = trackById;
    createNewsRoleLimit = newsRouteAccessMap.getRoleLimitFor('news/create');

    newsPageFetcher: PageFetcherFn<PagedNews> = ({limit, offset, search}) => { 
        return this.news.getNewsPage({ 
            limit,
            offset,
            sort: { creationDate: { ordering:  SortingOrder.Desc } },
            filter: !search ? void 0 : { props: { title: { ilike: search } } }
        });
    }

    constructor(private readonly news: NewsService) { }
}