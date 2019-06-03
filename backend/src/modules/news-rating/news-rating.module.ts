import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule      } from '@nestjs/typeorm';

import { CommonModule } from '@modules/common/common.module';
import { NewsModule   } from '@modules/news/news.module';
import { UserModule   } from '@modules/user/user.module';

import { NewsRating        } from './news-rating.entity';
import { NewsRatingRepo    } from './news-rating.repository';
import { NewsRatingService } from './news-rating.service';
import { NewsRatingResolver } from './news-rating.resolver';

@Module({
    imports: [
        CommonModule,
        UserModule,
        forwardRef(() => NewsModule),
        TypeOrmModule.forFeature([NewsRating, NewsRatingRepo])
    ],
    providers: [NewsRatingService, NewsRatingResolver],
    exports:   [NewsRatingService]
})
export class NewsRatingModule {}