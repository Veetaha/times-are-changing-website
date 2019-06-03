import { Nullable  } from 'ts-typedefs';
import { InputType } from 'type-graphql';

import { NullableOpt       } from '@utils/gql/opts';
import { IPropsFilterInput } from '@utils/gql/filtering/inputs/props-filter-input.interface';
import { IntFilterInputField,     IntFilterInput    } from '@utils/gql/filtering/inputs/int.input';
import { StringFilterInputField,  StringFilterInput } from '@utils/gql/filtering/inputs/string.input';
import { DateFilterInputField,    DateFilterInput   } from '@utils/gql/filtering/inputs/date.input';

import { NewsComment } from '../news-comment.entity';

@InputType()
export class NewsCommentPropsFilterInput implements IPropsFilterInput<NewsComment> {
    @IntFilterInputField(NullableOpt)     id?:               Nullable<IntFilterInput>;
    @IntFilterInputField(NullableOpt)     newsId?:           Nullable<IntFilterInput>;
    @StringFilterInputField(NullableOpt)  commentatorLogin?: Nullable<StringFilterInput>;
    @StringFilterInputField(NullableOpt)  body?:             Nullable<StringFilterInput>;
    @DateFilterInputField(NullableOpt)    creationDate?:     Nullable<DateFilterInput>;
    @DateFilterInputField(NullableOpt)    lastUpdateDate?:   Nullable<DateFilterInput>;
}