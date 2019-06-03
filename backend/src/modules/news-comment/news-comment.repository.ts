import { EntityRepository, Repository } from 'typeorm';

import { NewsComment } from './news-comment.entity';

@EntityRepository(NewsComment)
export class NewsCommentRepo extends Repository<NewsComment> {

}