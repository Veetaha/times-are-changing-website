import { Injectable } from '@angular/core';
import { map        } from 'rxjs/operators';

import * as Gql from '@app/gql/generated';

@Injectable({ providedIn: 'root' })
export class NewsService {

    constructor(
        private readonly createNewsGQL:  Gql.CreateNewsGQL,
        private readonly getNewsByIdGQL: Gql.GetNewsByIdGQL,
        private readonly getNewsPageGQL: Gql.GetNewsPageGQL
    ) {}

    createNews(params: Gql.CreateNewsInput) {
        return this.createNewsGQL
            .mutate({params})
            .pipe(map(v => v.data!.createNews.id));
    }

    getNewsById(id: number) {
        return this.getNewsByIdGQL
            .fetch({id})
            .pipe(map(v => v.data.getNewsById));
    }

    getNewsPage(params: Gql.NewsPaginationInput) {
        return this.getNewsPageGQL
            .fetch({params})
            .pipe(map(v => v.data.getNewsPage));
    }

}