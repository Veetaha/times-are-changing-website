import { Injectable } from '@angular/core';
import { map        } from 'rxjs/operators';

import * as Gql from '@app/gql/generated';

@Injectable({ providedIn: 'root' })
export class NewsCommentService {
    
    constructor(
        private readonly getNewsCommentsPageGQL:   Gql.GetNewsCommentsPageGQL,
        private readonly createNewsCommentGQL:     Gql.CreateNewsCommentGQL,
        private readonly deleteNewsCommentByIdGQL: Gql.DeleteNewsCommentByIdGQL
    ) {}

    getNewsCommentsPage(params: Gql.NewsCommentPaginationInput) {
        return this.getNewsCommentsPageGQL
            .fetch({params})
            .pipe(map(v => v.data.getNewsCommentsPage));
    }

    createNewsComment(params: Gql.CreateNewsCommentInput) {
        return this.createNewsCommentGQL
            .mutate({params})
            .pipe(map(v => v.data!.createNewsComment));
    }

    deleteNewsCommentById(id: number) {
        return this.deleteNewsCommentByIdGQL
            .mutate({id})
            .pipe(map(v => v.data!));
    }
}