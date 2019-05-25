import { InputType } from 'type-graphql';

import { PaginationInput } from '@utils/gql/pagination/pagination.input';

import { UserPropsFilterInput } from './user-props-filter.input';
import { UserSortInput } from './user-sort.input';
import { User } from '../user.entity';

@InputType()
export class UserPaginationInput extends PaginationInput({ 
    propsFilter: UserPropsFilterInput,
    sort:        UserSortInput,
    entity:      User 
}) {}