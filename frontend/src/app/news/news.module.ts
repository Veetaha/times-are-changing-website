import { NgModule } from '@angular/core';

import { CommonModule } from '@app/common/common.module';
import { AuthModule   } from '@app/auth/auth.module';


import { NewsRoutingModule    } from './news-routing.module';
import { AllNewsComponent     } from './all-news/all-news.component';
import { CreateNewsComponent  } from './create-news/create-news.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { PagedNewsComponent   } from './all-news/paged-news/paged-news.component';
import { NewsCommentModule    } from './news-comment/news-comment.module';

@NgModule({
    imports: [
        CommonModule,
        AuthModule,
        NewsRoutingModule,
        NewsCommentModule
    ],
    declarations: [
        AllNewsComponent,
        CreateNewsComponent,
        NewsDetailsComponent,
        PagedNewsComponent
    ]
})
export class NewsModule {
}