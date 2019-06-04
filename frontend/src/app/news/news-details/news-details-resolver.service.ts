import { Observable } from 'rxjs';
import { map        } from 'rxjs/operators';
import { Store      } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { isValidId    } from '@common/utils/validations';
import { Warning      } from '@app/error/error.actions';
import { OpenHomePage } from '@app/app.actions';

import { NewsService } from '../news.service';

@Injectable({ providedIn: 'root' })
export class NewsDetailsResolverService implements Resolve<void> {
    constructor(
        private readonly news:  NewsService,
        private readonly store: Store
    ) {}

    resolve(route: ActivatedRouteSnapshot): void | Observable<any> {
        const newsId = parseInt(route.paramMap.get('id')!, 10);
        return !isValidId(newsId)
            ? this.failWithWarning(`Invalid news id '${newsId}'`)
            : this.news.getNewsById(newsId).pipe(map(news => news == null 
                ? this.failWithWarning(`Failed to fetch news #${newsId}`)
                : news
            ));        
    }

    private failWithWarning(warningMessage: string) {
        this.store.dispatch(new Warning(warningMessage));
        this.store.dispatch(OpenHomePage);
    }
}