import { Module        } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from '@modules/common/common.module';
import { NewsModule   } from '@modules/news/news.module';
import { UserModule   } from '@modules/user/user.module';

import { NewsComment         } from './news-comment.entity';
import { NewsCommentRepo     } from './news-comment.repository';
import { NewsCommentService  } from './news-comment.service';
import { NewsCommentResolver } from './news-comment.resolver';

@Module({
    imports: [
        CommonModule,
        UserModule,
        NewsModule,
        TypeOrmModule.forFeature([NewsComment, NewsCommentRepo])
    ],
    providers: [NewsCommentService, NewsCommentResolver],
    exports:   [NewsCommentService]
})
export class NewsCommentModule {}