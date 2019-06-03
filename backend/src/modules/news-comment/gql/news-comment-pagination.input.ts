import { InputType } from 'type-graphql';

import { PaginationInput } from '@utils/gql/pagination/pagination.input';

import { NewsComment                 } from '../news-comment.entity';
import { NewsCommentPropsFilterInput } from './news-comment-props-filter.input';
import { NewsCommentSortInput        } from './news-comment-sort.input';

@InputType()
export class NewsCommentPaginationInput extends PaginationInput({
    propsFilter: NewsCommentPropsFilterInput,
    sort:        NewsCommentSortInput,
    entity:      NewsComment
}) {}