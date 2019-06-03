import { InjectRepository      } from '@nestjs/typeorm';
import { GraphQLDatabaseLoader } from 'typeorm-loader';
import { GraphQLResolveInfo    } from 'graphql';
import { Injectable, ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';

import { User                } from '@modules/user/user.entity';
import { OrmUtilsService     } from '@utils/orm/orm-utils.service';

import { NewsRepo            } from './news.repository';
import { NewsPaginationInput } from './gql/news-pagination.input';
import { UpdateNewsInput     } from './gql/update-news.input';
import { CreateNewsInput     } from './gql/create-news.input';
import { News                } from './news.entity';

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(NewsRepo)
        private readonly repo: NewsRepo,
        private readonly orm:  OrmUtilsService
    ) {}
    

    /**
     * Returns a page of news.
     * 
     * @param pageInput Pagination parameters to use.
     */
    async getPage(pageInput: NewsPaginationInput) {
        return this.orm.getPage(this.repo, pageInput);
    }

    /**
     * Returns news by its unique identifier.
     * 
     * @param id Identifier of the target news to retrieve.
     */
    async getById(id: number) {
        return this.repo.findOne({ where: {id} });
    }

    /**
     * Loads news by `id` using the given `loader` and graphql `info`.
     * 
     * @param loader Data loader to use for queries.
     * @param info   `GraphQLResolveInfo` to use for selection.
     * @param id     Target news unique identifier.
     */
    async loadById(
        loader: GraphQLDatabaseLoader,
        info:   GraphQLResolveInfo,
        id:     number
    ) {
        return loader.loadOne<News>(News, { id }, info);
    }

    /**
     * Updates news data under the given `id`. Returns updated news.
     * Returns `null` if no news was found to update.
     * 
     * @param param0 Parameteres for update.
     */
    async update({ id, ...upd}: UpdateNewsInput) {
        return this.orm.updateOne(this.repo, upd, 'id = :id', {id});
    }       

    /**
     * Creates news on behalf of the user with login `creatorLogin`.
     * 
     * @param creatorLogin User id who creates the news.
     * @param data         Intial data to be assigned to the created news.
     */
    async create(creatorLogin: string, data: CreateNewsInput) {
        return this.repo.save(this.repo.merge(this.repo.create(data), {creatorLogin}));
    }

    /**
     * Does nothing if news with `id` already exists in the database.
     * Otherwise throws `HttpException`.
     * 
     * @param id Unique identifier of the propsal to query existence for.
     */
    async ensureNewsExistsOrFail(id: number) {
        // Cannot throw `NotFoundException` as it will be caught by 
        // Frontend excpetion filter that will blow up because it expects
        // `Express.Response` object, but grahpql input object will be given instead.
        if (0 === await this.repo.count({ where: {id} })) {
            throw new HttpException(`no news was found under id #${id}`, HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Deletes news by `id` and returns `true` if news was deleted indeed.
     * Returns `false` if there was no news to delete.
     * 
     * @param id Identifier of the news to delete.
     */
    async delete(id: number) {
        return (await this.repo.delete({id})).affected! > 0;
    }

    /**
     * Returns `true` if news with `newsId` was created by user with
     * `creatorLogin`.
     * 
     * @param creatorLogin Login of the user to compare with.
     * @param newsId   Identifier of the news to check.
     */
    async isCreatedByUser(creatorLogin: string, newsId: number) {
        return 0 < await this.repo.count({ where: { creatorLogin, id: newsId } });
    }

    /**
     * Does nothing if `user` has rights to mutate the news with `newsId`.
     * Otherwise throws `ForbiddenException`.
     * 
     * @param user   User who is checked to have mutation rights.
     * @param newsId Target news id.
     */
    async ensureUserCanMutateNewsOrFail(user: User, newsId: number) {
        if (!user.isAdmin() && !await this.isCreatedByUser(user.login, newsId)) {
            throw new ForbiddenException(`you have no rights to mutate news #${newsId}`);
        }
    }
}
