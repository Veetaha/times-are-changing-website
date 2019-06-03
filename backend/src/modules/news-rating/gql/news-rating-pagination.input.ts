import { InputType } from 'type-graphql';

import { PaginationInput } from '@utils/gql/pagination/pagination.input';

import { NewsRating                 } from '../news-rating.entity';
import { NewsRatingPropsFilterInput } from './news-rating-props-filter.input';
import { NewsRatingSortInput        } from './news-rating-sort.input';

@InputType()
export class NewsRatingPaginationInput extends PaginationInput({
    propsFilter: NewsRatingPropsFilterInput,
    sort:        NewsRatingSortInput,
    entity:      NewsRating
}) {}