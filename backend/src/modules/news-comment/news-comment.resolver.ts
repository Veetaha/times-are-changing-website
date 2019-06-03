import { GraphQLDatabaseLoader } from 'typeorm-loader';
import { GraphQLResolveInfo    } from 'graphql';
import { Root, Resolver, Query, Mutation, ResolveProperty, Info, Args } from '@nestjs/graphql';

import { Auth        } from '@modules/auth/auth.decorator';
import { User        } from '@modules/user/user.entity';
import { Client      } from '@modules/auth/client.decorator';
import { NewsService } from '@modules/news/news.service';
import { UserService } from '@modules/user/user.service';
import { DataLoader  } from '@modules/common/data-loader.decorator';
import { News        } from '@modules/news/news.entity';
import { ArgsId      } from '@utils/gql/id/args-id.decorator';

import { NewsCommentService         } from './news-comment.service';
import { NewsCommentPage            } from './gql/news-comment-page.object';
import { NewsCommentPaginationInput } from './gql/news-comment-pagination.input';
import { CreateNewsCommentInput     } from './gql/create-news-comment.input';
import { UpdateNewsCommentInput     } from './gql/update-news-comment.input';
import { NewsComment                } from './news-comment.entity';


@Resolver(NewsComment)
export class NewsCommentResolver {

    constructor(
        private readonly newsComments: NewsCommentService,
        private readonly users:        UserService,
        private readonly newsService:  NewsService
    ) {}

    @ResolveProperty('commentator', _type => User, {
        description: 'Returns the user that commented on the given `news`.'
    })
    async commentator(
        @DataLoader loader:             GraphQLDatabaseLoader,
        @Info()     info:               GraphQLResolveInfo,
        @Root()     {commentatorLogin}: NewsComment
    ) {
        return this.users.loadByLogin(loader, info, commentatorLogin);
    }

    @ResolveProperty('news', _type => News, {
        description: 'Returns the news that was commented by the `commentator`.'
    })
    async news(
        @DataLoader loader:   GraphQLDatabaseLoader,
        @Info()     info:     GraphQLResolveInfo,
        @Root()     {newsId}: NewsComment
    ) {
        return this.newsService.loadById(loader, info, newsId);
    }

    @Query(_returns => NewsCommentPage, {
        description: "Paginates all news comments."
    })
    async getNewsCommentsPage(@Args('params') params: NewsCommentPaginationInput) {
        return this.newsComments.getPage(params);
    }

    @Auth()
    @Mutation(_returns => NewsComment, {
        description: "Requires auth. Creates comment on news from behalf of the client."
    })
    async createNewsComment(@Client client: User, @Args('params') {newsId, body}: CreateNewsCommentInput) {
        await  this.newsService.ensureNewsExistsOrFail(newsId);
        return this.newsComments.create(client.login, newsId, body);
    }   

    @Auth()
    @Mutation(_returns => NewsComment, {
        description: 
        "Requires auth. Updates news comment and returns it, but throws if comment " +
        "doesn't exist or client has no rights to mutate the comment."
    })
    async updateNewsComment(@Client client: User, @Args('params') params: UpdateNewsCommentInput) {
        await  this.newsComments.ensureUserCanMutateNewsCommentOrFail(client, params.id);
        return this.newsComments.update(params);
    }


    @Auth()
    @Mutation(_returns => Boolean, {
        description:
        "Requires auth. Deletes news comment with the given `id`. Returns `true` " + 
        "if deletion was successful. Throws if client has no rights to delete the " +
        "target news comment."
    })
    async deleteNewsCommentById(@Client client: User, @ArgsId id: number) {
        await  this.newsComments.ensureUserCanMutateNewsCommentOrFail(client, id);
        return this.newsComments.delete(id);
    }
}