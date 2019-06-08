import { Injectable } from '@angular/core';
import { map        } from 'rxjs/operators';

import * as Gql from '@app/gql/generated';

@Injectable({ providedIn: 'root' })
export class NewsService {

    constructor(
        private readonly rateNewsGQL:         Gql.RateNewsGQL,
        private readonly createNewsGQL:       Gql.CreateNewsGQL,
        private readonly getNewsByIdGQL:      Gql.GetNewsByIdGQL,
        private readonly getNewsPageGQL:      Gql.GetNewsPageGQL,
        private readonly deleteNewsByIdGQL:   Gql.DeleteNewsByIdGQL,
        private readonly deleteNewsRatingGQL: Gql.DeleteNewsRatingGQL
    ) {}

    deleteNewsRating(newsId: number) {
        return this.deleteNewsRatingGQL
            .mutate({newsId})
            .pipe(map(v => v.data!));
    }

    rateNews(newsId: number, hasLiked: boolean) {
        return this.rateNewsGQL
            .mutate({newsId, hasLiked})
            .pipe(map(v => v.data!.rateNews));
    }

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

    deleteNewsById(id: number) {
        return this.deleteNewsByIdGQL
            .mutate({id})
            .pipe(map(v => v.data!));
    }

}