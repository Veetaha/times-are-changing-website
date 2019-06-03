import { ObjectType } from 'type-graphql';

import { Page } from '@utils/gql/pagination/page.object';

import { NewsRating } from '../news-rating.entity';

@ObjectType()
export class NewsRatingPage extends Page(NewsRating) {}