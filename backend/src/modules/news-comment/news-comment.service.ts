import { Injectable, ForbiddenException            } from '@nestjs/common';
import { InjectRepository      } from '@nestjs/typeorm';
import { GraphQLDatabaseLoader } from 'typeorm-loader';
import { GraphQLResolveInfo    } from 'graphql';

import { OrmUtilsService } from '@utils/orm/orm-utils.service';

import { NewsCommentRepo            } from './news-comment.repository';
import { NewsComment                } from './news-comment.entity';
import { NewsCommentPaginationInput } from './gql/news-comment-pagination.input';
import { UpdateNewsCommentInput } from './gql/update-news-comment.input';
import { User } from '@modules/user/user.entity';




@Injectable()
export class NewsCommentService {

    constructor(
        @InjectRepository(NewsComment)
        private readonly repo: NewsCommentRepo,
        private readonly orm:  OrmUtilsService
    ) {}

    /**
     * Returns a page of comments.
     * 
     * @param pageInput Pagination parameters to use.
     */
    async getPage(pageInput: NewsCommentPaginationInput) {
        return this.orm.getPage(this.repo, pageInput);
    }

    /**
     * Loads comment by the given primary key or `null` if nothig was found. 
     */
    async loadOne(
        loader:     GraphQLDatabaseLoader,
        info:       GraphQLResolveInfo,
        commentId:  number
    ) {
        return loader.loadOne<NewsComment>(NewsComment, { id: commentId }, info);
    }

    /**
     * Returns comment by its unique identifier.
     * 
     * @param id Identifier of the target comment to retrieve.
     */
    async getById(id: number) {
        return this.repo.findOne({ where: {id} });
    }

    /**
     * Creates comment in the database.
     * 
     * **Pre:** user under `commentatorLogin` and news under `newsId` already exist
     * in the database. 
     */
    async create(commentatorLogin: string, newsId: number, body: string) {
        return this.repo.save(this.repo.create({
            commentatorLogin,
            newsId,
            body
        }));   
    }

    /**
     * Updates comment in the database.
     * **Pre:** News comment already exists in the database.
     * 
     * @param param0 Parameteres for update.
     */
    async update({id, ...upd}: UpdateNewsCommentInput) {
        return this.orm.updateOne(this.repo, upd, 'id = :id', {id});
    }

    /**
     * Deletes comment from the database.
     * 
     * @param id Unique identifier of the comment to delete.
     * 
     * @returns `true` if comment was successfully deleted, `false` otherwise.
     */
    async delete(id: number) {
        return this.orm.delete(this.repo, {id});
    }

    /**
     * Does nothing if `user` has rights to mutate the comment with `commentId`.
     * Otherwise throws `ForbiddenException`.
     * 
     * @param user      User who is checked to have mutation rights.
     * @param commentId Target comment id.
     */
    async ensureUserCanMutateNewsCommentOrFail(user: User, commentId: number) {
        if (!user.isAdmin() && !await this.isCreatedByUser(user.login, commentId)) {
            throw new ForbiddenException(`you have no rights to mutate news comment #${commentId}`);
        }
    }

    /**
     * Returns `true` if comment with `commentId` was created by user with
     * `commentatorLogin`.
     * 
     * @param commentatorLogin Login of the user to compare with.
     * @param commentId        Identifier of the news to check.
     */
    async isCreatedByUser(commentatorLogin: string, commentId: number) {
        return 0 < await this.repo.count({ where: { commentatorLogin, id: commentId } });
    }

}