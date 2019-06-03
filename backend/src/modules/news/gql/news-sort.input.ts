import { Nullable  } from 'ts-typedefs';
import { InputType } from 'type-graphql';


import { NullableOpt    } from '@utils/gql/opts';
import { SortInput      } from '@utils/gql/sorting/sort.input';
import { ISortInput     } from '@utils/gql/sorting/sort-input.interface';
import { SortInputField } from '@utils/gql/sorting/sort-input-field.decorator';

import { News } from '../news.entity';

@InputType()
export class NewsSortInput implements ISortInput<News> {
    @SortInputField(NullableOpt) id?:             Nullable<SortInput>;
    @SortInputField(NullableOpt) title?:          Nullable<SortInput>;
    @SortInputField(NullableOpt) creatorLogin?:   Nullable<SortInput>;   
    @SortInputField(NullableOpt) creationDate?:   Nullable<SortInput>;
    @SortInputField(NullableOpt) lastUpdateDate?: Nullable<SortInput>;        
}