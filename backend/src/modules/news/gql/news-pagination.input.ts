import { InputType } from 'type-graphql';

import { PaginationInput } from '@utils/gql/pagination/pagination.input';

import { News                 } from '../news.entity';
import { NewsPropsFilterInput } from './news-props-filter.input';
import { NewsSortInput        } from './news-sort.input';

@InputType()
export class NewsPaginationInput extends PaginationInput({
    propsFilter: NewsPropsFilterInput,
    sort:        NewsSortInput,
    entity:      News
}) {}