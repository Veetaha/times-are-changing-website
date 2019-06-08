import { Observable } from 'rxjs';
import { map        } from 'rxjs/operators';
import { Store      } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { isValidId } from '@common/utils/validations';
import { CriticalError } from '@app/error/error.actions';

import { NewsService } from '../news.service';

/**
 * Prefetches news data before navigating to the news details page.
 */
@Injectable({ providedIn: 'root' })
export class NewsDetailsResolverService implements Resolve<void> {
    constructor(
        private readonly news:  NewsService,
        private readonly store: Store
    ) {}

    resolve(route: ActivatedRouteSnapshot): void | Observable<any> {
        const newsId = parseInt(route.paramMap.get('id')!, 10);
        return !isValidId(newsId)
            ? this.failWithMessage(`Invalid news id '${newsId}'`)
            : this.news.getNewsById(newsId).pipe(map(news => news == null 
                ? this.failWithMessage(`Failed to fetch news #${newsId}`)
                : news
            ));        
    }

    private failWithMessage(message: string) {
        this.store.dispatch(new CriticalError(message));
    }
}