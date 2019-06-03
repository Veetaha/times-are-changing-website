import { Injectable            } from '@nestjs/common';
import { InjectRepository      } from '@nestjs/typeorm';
import { GraphQLDatabaseLoader } from 'typeorm-loader';
import { GraphQLResolveInfo    } from 'graphql';

import { OrmUtilsService } from '@utils/orm/orm-utils.service';

import { NewsRatingRepo            } from './news-rating.repository';
import { NewsRating                } from './news-rating.entity';
import { NewsRatingPaginationInput } from './gql/news-rating-pagination.input';




@Injectable()
export class NewsRatingService {

    constructor(
        @InjectRepository(NewsRating)
        private readonly repo: NewsRatingRepo,
        private readonly orm:  OrmUtilsService
    ) {}

    /**
     * Returns a page of ratings.
     * 
     * @param pageInput Pagination parameters to use.
     */
    async getPage(pageInput: NewsRatingPaginationInput) {
        return this.orm.getPage(this.repo, pageInput);
    }

    /**
     * Loads rating by the given primary keys or `null` if nothig was found. 
     */
    async loadOne(
        loader:     GraphQLDatabaseLoader,
        info:       GraphQLResolveInfo,
        raterLogin: string,
        newsId:     number
    ) {
        return loader.loadOne<NewsRating>(NewsRating, { raterLogin, newsId }, info);
    }

    /**
     * Creates or updates rating in the database.
     * 
     * **Pre:** user under `raterLogin` and news under `newsId` already exist
     * in the database. 
     */
    async setRating(raterLogin: string, newsId: number, hasLiked: boolean) {
        return this.repo.save(this.repo.create({hasLiked, raterLogin, newsId}));   
    }

    /**
     * Deletes rating from the database. News likesAmount/dislikesAmount gets
     * automatically updated in `NewsEntitySubscriber`.
     */
    async delete(raterLogin: string, newsId: number) {
        return this.orm.removeOne(this.repo, {raterLogin, newsId});
    }
}