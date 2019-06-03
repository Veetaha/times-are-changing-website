import { Nullable  } from 'ts-typedefs';
import { InputType } from 'type-graphql';

import { ISortInput     } from '@utils/gql/sorting/sort-input.interface';
import { SortInputField } from '@utils/gql/sorting/sort-input-field.decorator';
import { NullableOpt    } from '@utils/gql/opts';
import { SortInput      } from '@utils/gql/sorting/sort.input';

import { NewsComment } from '../news-comment.entity';

@InputType()
export class NewsCommentSortInput implements ISortInput<NewsComment> {
    @SortInputField(NullableOpt) newsId?:           Nullable<SortInput>;
    @SortInputField(NullableOpt) commentatorLogin?: Nullable<SortInput>;
    @SortInputField(NullableOpt) creationDate?:     Nullable<SortInput>;
    @SortInputField(NullableOpt) lastUpdateDate?:   Nullable<SortInput>;   
}