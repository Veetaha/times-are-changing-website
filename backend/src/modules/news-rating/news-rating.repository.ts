import { EntityRepository, Repository } from 'typeorm';

import { NewsRating } from './news-rating.entity';

@EntityRepository(NewsRating)
export class NewsRatingRepo extends Repository<NewsRating> {

}