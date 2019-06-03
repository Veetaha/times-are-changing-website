import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule      } from '@modules/common/common.module';
import { UserModule        } from '@modules/user/user.module';
import { AuthModule        } from '@modules/auth/auth.module';
import { NewsRatingModule  } from '@modules/news-rating/news-rating.module';

import { NewsService          } from './news.service';
import { NewsRepo             } from './news.repository';
import { News                 } from './news.entity';
import { NewsResolver         } from './news.resolver';
import { NewsRatingEntitySubscriber } from './news-rating.entity-subscriber';
import { NewsCommentEntitySubscriber } from './news-comment.entity-subscriber';


@Module({
    imports: [
        CommonModule,
        UserModule,
        AuthModule,
        forwardRef(() => NewsRatingModule),
        TypeOrmModule.forFeature([News, NewsRepo])
    ],
    providers: [
        NewsService, 
        NewsResolver, 
        NewsRatingEntitySubscriber,
        NewsCommentEntitySubscriber
    ],
    exports:   [NewsService]
})
export class NewsModule {}
