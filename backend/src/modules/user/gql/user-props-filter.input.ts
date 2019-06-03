import { Nullable } from 'ts-typedefs';
import { InputType, Field } from 'type-graphql';

import { NullableOpt       } from '@utils/gql/opts';
import { IPropsFilterInput } from '@utils/gql/filtering/inputs/props-filter-input.interface';
import { StringFilterInputField, StringFilterInput } from '@utils/gql/filtering/inputs/string.input';
import { DateFilterInputField,   DateFilterInput   } from '@utils/gql/filtering/inputs/date.input';

import { User                } from '../user.entity';
import { UserRoleFilterInput } from './user-role-filter.input';

@InputType()
export class UserPropsFilterInput implements IPropsFilterInput<User> {
    @StringFilterInputField(NullableOpt) avatarImgId?:    Nullable<StringFilterInput>;
    @DateFilterInputField  (NullableOpt) creationDate?:   Nullable<DateFilterInput>;
    @DateFilterInputField  (NullableOpt) lastUpdateDate?: Nullable<DateFilterInput>; 
    @StringFilterInputField(NullableOpt) login?:          Nullable<StringFilterInput>;
    @StringFilterInputField(NullableOpt) name?:           Nullable<StringFilterInput>;
    @Field(() => UserRoleFilterInput, NullableOpt) role?: Nullable<UserRoleFilterInput>;
}