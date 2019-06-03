import { Nullable  } from 'ts-typedefs';
import { InputType } from 'type-graphql';

import { NullableOpt    } from '@utils/gql/opts';
import { SortInput      } from '@utils/gql/sorting/sort.input';
import { ISortInput     } from '@utils/gql/sorting/sort-input.interface';
import { SortInputField } from '@utils/gql/sorting/sort-input-field.decorator';

import { User } from '../user.entity';

@InputType()
export class UserSortInput implements ISortInput<User> {
    @SortInputField(NullableOpt) login?:          Nullable<SortInput>;
    @SortInputField(NullableOpt) name?:           Nullable<SortInput>;
    @SortInputField(NullableOpt) creationDate?:   Nullable<SortInput>;
    @SortInputField(NullableOpt) lastUpdateDate?: Nullable<SortInput>;
    @SortInputField(NullableOpt) role?:           Nullable<SortInput>;
}