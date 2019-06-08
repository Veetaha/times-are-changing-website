import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';

import { ImageService } from '@app/common/image/image.service';
import { AuthState    } from '@app/auth/auth.state';

import { PagedNewsComment } from '../../../news.interfaces';
import { UserRole } from '@app/gql/generated';


@Component({
    selector:    'app-paged-news-comment',
    templateUrl: './paged-news-comment.component.html',
    styleUrls:  ['./paged-news-comment.component.scss']
})
export class PagedNewsCommentComponent implements OnInit {
    @Input() comment!: PagedNewsComment;
    @Output() deleteComment = new EventEmitter<undefined>();

    canClientMutateComment$ = AuthState.selectClient(this.store).pipe(map(
        client => client != null && (
            client.login === this.comment.commentator.login ||
            client.role === UserRole.Admin
        )
    ));

    constructor(
        public readonly images: ImageService,
        private readonly store: Store
    ) {}

    ngOnInit() {
    }
}