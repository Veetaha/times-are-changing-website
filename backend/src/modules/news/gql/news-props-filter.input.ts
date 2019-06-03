import { Nullable  } from 'ts-typedefs';
import { InputType } from 'type-graphql';

import { NullableOpt       } from '@utils/gql/opts';
import { IPropsFilterInput } from '@utils/gql/filtering/inputs/props-filter-input.interface';
import { IntFilterInputField,    IntFilterInput    } from '@utils/gql/filtering/inputs/int.input';
import { StringFilterInputField, StringFilterInput } from '@utils/gql/filtering/inputs/string.input';
import { DateFilterInputField,   DateFilterInput   } from '@utils/gql/filtering/inputs/date.input';

import { News } from '../news.entity';


@InputType()
export class NewsPropsFilterInput implements IPropsFilterInput<News> {
    @IntFilterInputField(NullableOpt)    id?:             Nullable<IntFilterInput>;
    @StringFilterInputField(NullableOpt) title?:          Nullable<StringFilterInput>;
    @StringFilterInputField(NullableOpt) promoImgId?:     Nullable<StringFilterInput>;
    @StringFilterInputField(NullableOpt) creatorLogin?:   Nullable<StringFilterInput>;
    @DateFilterInputField(NullableOpt)   creationDate?:   Nullable<DateFilterInput>;
    @DateFilterInputField(NullableOpt)   lastUpdateDate?: Nullable<DateFilterInput>;
}