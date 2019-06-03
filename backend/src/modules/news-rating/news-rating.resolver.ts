import { GraphQLDatabaseLoader } from 'typeorm-loader';
import { GraphQLResolveInfo    } from 'graphql';
import { Root, Resolver, Query, Args, Mutation, ResolveProperty, Info } from '@nestjs/graphql';

import { Auth        } from '@modules/auth/auth.decorator';
import { User        } from '@modules/user/user.entity';
import { Client      } from '@modules/auth/client.decorator';
import { NewsService } from '@modules/news/news.service';
import { UserService } from '@modules/user/user.service';
import { DataLoader  } from '@modules/common/data-loader.decorator';
import { News        } from '@modules/news/news.entity';

import { NewsRatingService         } from './news-rating.service';
import { NewsRatingPage            } from './gql/news-rating-page.object';
import { NewsRatingPaginationInput } from './gql/news-rating-pagination.input';
import { RateNewsArgs              } from './gql/rate-news.args';
import { NewsRating                } from './news-rating.entity';


@Resolver(NewsRating)
export class NewsRatingResolver {

    constructor(
        private readonly newsRatings: NewsRatingService,
        private readonly users:       UserService,
        private readonly newsService: NewsService
    ) {}

    @ResolveProperty('rater', _type => User, {
        description: 'Returns the user that rated the given `news`.'
    })
    async rater(
        @DataLoader loader:       GraphQLDatabaseLoader,
        @Info()     info:         GraphQLResolveInfo,
        @Root()     {raterLogin}: NewsRating
    ) {
        return this.users.loadByLogin(loader, info, raterLogin);
    }

    @ResolveProperty('news', _type => News, {
        description: 'Returns the news that was rated by the `rater`.'
    })
    async news(
        @DataLoader loader:   GraphQLDatabaseLoader,
        @Info()     info:     GraphQLResolveInfo,
        @Root()     {newsId}: NewsRating
    ) {
        return this.newsService.loadById(loader, info, newsId);
    }

    @Query(_returns => NewsRatingPage, {
        description: "Paginates all news ratings."
    })
    async getNewsRatingsPage(@Args('params') params: NewsRatingPaginationInput) {
        return this.newsRatings.getPage(params);
    }

    @Auth()
    @Mutation(_returns => NewsRating, {
        description: 
        "Requires auth. Creates or updates existing rating the client gave to the news."
    })
    async rateNews(@Client {login}: User, @Args() {newsId, hasLiked}: RateNewsArgs) {
        await  this.newsService.ensureNewsExistsOrFail(newsId);
        return this.newsRatings.setRating(login, newsId, hasLiked);
    }   

    @Auth()
    @Mutation(_returns => Boolean, {
        description:
        "Requires auth. Deletes rating instance on behalf of the client. " +
        "Returns `true` if deletion was successful."
    })
    async deleteNewsRating(@Client {login}: User, @Args('newsId') newsId: number) {
        return this.newsRatings.delete(login, newsId);
    }
}