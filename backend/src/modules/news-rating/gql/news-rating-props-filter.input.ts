import { Nullable  } from 'ts-typedefs';
import { InputType } from 'type-graphql';

import { NullableOpt       } from '@utils/gql/opts';
import { IPropsFilterInput } from '@utils/gql/filtering/inputs/props-filter-input.interface';
import { IntFilterInputField,     IntFilterInput     } from '@utils/gql/filtering/inputs/int.input';
import { StringFilterInputField,  StringFilterInput  } from '@utils/gql/filtering/inputs/string.input';
import { BooleanFilterInputField, BooleanFilterInput } from '@utils/gql/filtering/inputs/boolean.input';

import { NewsRating } from '../news-rating.entity';

@InputType()
export class NewsRatingPropsFilterInput implements IPropsFilterInput<NewsRating> {
    @IntFilterInputField(NullableOpt)     newsId?:     Nullable<IntFilterInput>;
    @StringFilterInputField(NullableOpt)  raterLogin?: Nullable<StringFilterInput>;
    @BooleanFilterInputField(NullableOpt) hasLiked?:   Nullable<BooleanFilterInput>;
}