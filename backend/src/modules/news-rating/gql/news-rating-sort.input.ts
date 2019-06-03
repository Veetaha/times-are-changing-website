import { Nullable  } from 'ts-typedefs';
import { InputType } from 'type-graphql';

import { ISortInput     } from '@utils/gql/sorting/sort-input.interface';
import { SortInputField } from '@utils/gql/sorting/sort-input-field.decorator';
import { NullableOpt    } from '@utils/gql/opts';
import { SortInput      } from '@utils/gql/sorting/sort.input';

import { NewsRating } from '../news-rating.entity';

@InputType()
export class NewsRatingSortInput implements ISortInput<NewsRating> {
    @SortInputField(NullableOpt) newsId?:     Nullable<SortInput>;
    @SortInputField(NullableOpt) raterLogin?: Nullable<SortInput>;
    @SortInputField(NullableOpt) hasLiked?:   Nullable<SortInput>;
}