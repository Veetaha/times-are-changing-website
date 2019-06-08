import { NgModule } from '@angular/core';

import { CommonModule } from '@app/common/common.module';
import { AuthModule   } from '@app/auth/auth.module';
import { UserModule   } from '@app/user/user.module';

import { AllNewsCommentsComponent   } from './all-news-comments/all-news-comments.component';
import { CreateNewsCommentComponent } from './create-news-comment/create-news-comment.component';
import { PagedNewsCommentComponent } 
from './all-news-comments/paged-news-comment/paged-news-comment.component';

@NgModule({
    imports: [
        CommonModule,
        AuthModule,
        UserModule
    ],
    declarations: [
        AllNewsCommentsComponent,
        PagedNewsCommentComponent,
        CreateNewsCommentComponent
    ],
    exports: [
        AllNewsCommentsComponent,
        CreateNewsCommentComponent
    ]
})
export class NewsCommentModule {

}