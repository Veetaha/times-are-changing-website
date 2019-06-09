import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngxs/store';
import { ImageService } from '@app/common/image/image.service';
import { AuthState    } from '@app/auth/auth.state';

import { PagedNewsComment } from '../../../news.interfaces';
import { UserRole } from '@app/gql/generated';
import { Client } from '@app/auth/interfaces';
import { Nullable } from 'ts-typedefs';


@Component({
    selector:    'app-paged-news-comment',
    templateUrl: './paged-news-comment.component.html',
    styleUrls:  ['./paged-news-comment.component.scss']
})
export class PagedNewsCommentComponent implements OnInit {
    @Input() comment!: PagedNewsComment;
    @Output() deleteComment = new EventEmitter<undefined>();

    client$ = AuthState.selectClient(this.store);

    canClientMutateComment(client: Nullable<Client>) {
        return client != null && (
            client.login === this.comment.commentator.login ||
            client.role  === UserRole.Admin
        );
    }

    constructor(
        private readonly store: Store,
        readonly images: ImageService
    ) {}

    ngOnInit() {
    }
}