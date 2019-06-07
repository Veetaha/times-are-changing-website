import { Nullable              } from 'ts-typedefs';
import { GraphQLDatabaseLoader } from 'typeorm-loader';
import { GraphQLResolveInfo    } from 'graphql';
import { Root, Resolver, Query, Args, Mutation, ResolveProperty, Info } from "@nestjs/graphql";

import { ArgsId } from '@utils/gql/id/args-id.decorator';

import { NewsRatingService  } from '@modules/news-rating/news-rating.service';
import { UserService        } from '@modules/user/user.service';
import { ConfigService      } from '@modules/config/config.service';
import { Client             } from '@modules/auth/client.decorator';
import { User               } from '@modules/user/user.entity';
import { DataLoader         } from '@modules/common/data-loader.decorator';
import { NewsRating         } from '@modules/news-rating/news-rating.entity';
import { Auth, OptionalAuth } from '@modules/auth/auth.decorator';

import { News                } from './news.entity';
import { NewsService         } from './news.service';
import { NewsPaginationInput } from './gql/news-pagination.input';
import { NewsPage            } from './gql/news-page.object';
import { CreateNewsInput     } from './gql/create-news.input';
import { UpdateNewsInput     } from './gql/update-news.input';
import { UserRole } from '@modules/user/user-role.enum';






@Resolver(News)
export class NewsResolver {

    constructor(
        private readonly news:        NewsService,
        private readonly users:       UserService,
        private readonly config:      ConfigService,
        private readonly newsRatings: NewsRatingService
    ) {}

    @OptionalAuth
    @ResolveProperty('myRating', _type => NewsRating, {
        nullable: true,
        description: 
        "Returns the rating that the client has set to this news " +
        "or `null` if client is not authenticated or he hasn't set any " +
        "rating to the target news yet."
    })
    async myRating(
        @Root()     news:   News, 
        @Info()     info:   GraphQLResolveInfo,
        @DataLoader loader: GraphQLDatabaseLoader,
        @Client     client: Nullable<User>,
    ) {
        return client == null 
            ? null 
            : this.newsRatings.loadOne(loader, info, client.login, news.id);
    }

    @ResolveProperty('promoImgIdOrDefault', _type => String, {
        description: 
        "Returns existing news `promoImgId` or default one if former was not set."
    })
    promoImgIdOrDefault(@Root() {promoImgId}: News) {
        return promoImgId == null 
            ? this.config.default.news.promoImgId
            : promoImgId;
    }

    @ResolveProperty('creator', _returns => User, {
        description: "Returns the user that created this news."
    })
    async creator(
        @Root()     {creatorLogin}: News, 
        @Info()     info:           GraphQLResolveInfo,
        @DataLoader loader:         GraphQLDatabaseLoader
    ) {
        return this.users.loadByLogin(loader, info, creatorLogin);
    }


    @Query(_returns => NewsPage, {
        description: "Paginates all news."
    })
    async getNewsPage(@Args('params') params: NewsPaginationInput) {
        return this.news.getPage(params);
    }

    @Query(_returns => News, {
        nullable: true,
        description: "Returns a single news instance by `id`, or `null` if nothing was found."
    })
    async getNewsById(@ArgsId id: number) {
        return this.news.getById(id);
    }

    @Auth(UserRole.Admin)
    @Mutation(_returns => News, {
        description: 
        "Requires addmin rights. Creates news on behalf of the client and returns it."
    })
    async createNews(@Client client: User, @Args('params') params: CreateNewsInput) {
        return this.news.create(client.login, params);
    }

    @Auth(UserRole.Admin)
    @Mutation(_returns => News, {
        description: 
        "Requires admin rights. Updates news and returns it, but throws if news " +
        "doesn't exist or client has no rights to mutate the news."
    })
    async updateNews(@Client client: User, @Args('params') params: UpdateNewsInput) {
        await  this.news.ensureUserCanMutateNewsOrFail(client, params.id);
        return this.news.update(params);
    }


    @Auth(UserRole.Admin)
    @Mutation(_returns => Boolean, {
        description: 
        "Requires admin rights. Deletes the news by id and returns `true`, but throws " +
        "if news doesn't exist or client has no rights to mutate the news."
    })
    async deleteNewsById(@Client client: User, @ArgsId newsId: number) {
        await  this.news.ensureUserCanMutateNewsOrFail(client, newsId);
        return this.news.delete(newsId);
    }
    
}