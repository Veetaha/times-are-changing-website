import { Module } from '@nestjs/common';

import { CommonModule     } from './common/common.module';
import { UserModule       } from './user/user.module';
import { AuthModule       } from './auth/auth.module';
import { FrontendModule   } from './frontend/frontend.module';
import { NewsModule       } from './news/news.module';
import { NewsRatingModule } from './news-rating/news-rating.module';
import { NewsCommentModule } from './news-comment/news-comment.module';

@Module({
    imports: [
        CommonModule,
        UserModule,
        AuthModule,
        NewsModule,
        NewsRatingModule,
        NewsCommentModule,
        FrontendModule
    ]
})
export class AppModule {}
