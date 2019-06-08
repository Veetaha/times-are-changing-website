import { RemoveKeys } from 'ts-typedefs';
import { Store } from '@ngxs/store';
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { limits                 } from '@common/constants';
import { TypedFormGroup         } from '@app/interfaces';
import { FormService            } from '@app/utils/form.service';
import { Warning                } from '@app/error/error.actions';
import { CreateNewsCommentInput } from '@app/gql/generated';
import { PagedNewsComment       } from '@app/news/news.interfaces';
import { AuthState              } from '@app/auth/auth.state';

import { NewsCommentService     } from '../news-comment.service';
import { NewsCommentFormService } from '../news-comment-form.service';

import { ImageService } from '@app/common/image/image.service';

export type CreatedNewsCommentEvent = RemoveKeys<PagedNewsComment, 'commentator'>;

@Component({
    selector:    'app-create-news-comment',
    templateUrl: './create-news-comment.component.html',
    styleUrls:  ['./create-news-comment.component.scss']
})
export class CreateNewsCommentComponent {
    @Input() newsId!: number;
    @Output() createdComment = new EventEmitter<CreatedNewsCommentEvent>();

    readonly client$ = AuthState.selectClient(this.store);
    readonly limits = limits;
    readonly form: TypedFormGroup<RemoveKeys<CreateNewsCommentInput, 'newsId'>>;

    constructor(
        private readonly newsComments: NewsCommentService,
        private readonly store: Store,
        readonly images: ImageService,
        newsCommentsForms: NewsCommentFormService,
        forms:     FormService,
    ) {
        this.form = forms.createFormGroup({
            body: newsCommentsForms.createBodyFormControl('')
        });
    }

    submitForm() {
        if (this.form.invalid) {
            throw new Error('Cannot submit invalid news comment.');
        }
        const { body } = this.form.value;
        this.newsComments.createNewsComment({ body, newsId: this.newsId}).subscribe(
            data => this.createdComment.emit({ ...data, body }),
            err => this.store.dispatch(new Warning(
                `Backend failed to create news comment. Please submit an error report ` +
                `to our webmaster with the following info: '${err.message}'.`
            ))
        );
    }

}