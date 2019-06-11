import _ from 'lodash';
import { Component, ViewChild, Input } from '@angular/core';
import { TdDialogService } from '@covalent/core/dialogs';
import { Store } from '@ngxs/store';

import { trackById           } from '@utils/track-by-id';
import { Success             } from '@app/common/common.actions';
import { PageFetcherFn       } from '@app/common/pagination/pagination.interfaces';
import { SortingOrder        } from '@app/gql/generated';
import { CriticalError       } from '@app/error/error.actions';
import { PaginationComponent } from '@app/common/pagination/pagination.component';
import { PagedNewsComment    } from '@app/news/news.interfaces';

import { NewsCommentService } from '../news-comment.service';


@Component({
    selector:    'app-all-news-comments',
    templateUrl: './all-news-comments.component.html',
    styleUrls:  ['./all-news-comments.component.scss']
})
export class AllNewsCommentsComponent {
    @ViewChild('paginator') paginator!: PaginationComponent<PagedNewsComment>;

    @Input() newsId!: number;

    trackById = trackById;

    
    // TODO: consider including search in comments
    newsCommentsPageFetcher: PageFetcherFn<PagedNewsComment> = ({limit, offset}) => (
        this.newsComments.getNewsCommentsPage({ 
            limit,
            offset,
            sort: { creationDate: { ordering: SortingOrder.Desc } },
            filter: { props: { newsId: { eq: this.newsId } } }
        })
    )
    

    constructor(
        private readonly newsComments: NewsCommentService,
        private readonly dialogs:      TdDialogService,
        private readonly store:        Store
    ) { }

    refetchNewsCommentsPage() {
        this.paginator.fetchPage();
    }

    // TODO: disable deleted news while waiting for server response
    async deleteNewsComment(commentId: number) {
        const confirmed = await this.dialogs.openConfirm({
            message: `Are you sure you want to delete this comment`,
            title: 'AHTUNG!',
            acceptButton: 'Yes',
            cancelButton: 'Cancel'
        }).afterClosed().toPromise();
        if (!confirmed) {
            return;
        }
        this.newsComments.deleteNewsCommentById(commentId).subscribe(
            () => {
                this.store.dispatch(new Success(`Successfully deleted comment.`));
                this.paginator.updateDueToPageItemsRemoved(1);
            },
            err => this.store.dispatch(new CriticalError(
                `Failed to delete comment: ${err.message}`
            ))
        );
    }

    
}