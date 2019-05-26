import { Nullable } from 'ts-typedefs';
import { InputType, Field } from 'type-graphql';

import * as I from '@app/interfaces';
import { StringField, StringArrField } from '@utils/gql/decorators/explicit-type-field.decorator';

import { AbstractFilterInput         } from './abstract-filter.input';
import { FilterOperator, getDescr } from '../fitler-operator.enum';

@InputType({ description: 'Filter input parameters for `String` type' })
export class StringFilterInput extends AbstractFilterInput {
    @StringField({ nullable: true, description: getDescr(FilterOperator.Eq) }) 
    [FilterOperator.Eq]?: Nullable<string>;

    @StringField({ nullable: true, description: getDescr(FilterOperator.Neq) }) 
    [FilterOperator.Neq]?: Nullable<string>;

    @StringField({ nullable: true, description: getDescr(FilterOperator.Iregexp) }) 
    [FilterOperator.Iregexp]?: Nullable<string>;

    @StringField({ nullable: true, description: getDescr(FilterOperator.Niregexp) }) 
    [FilterOperator.Niregexp]?: Nullable<string>;

    @StringField({ nullable: true, description: getDescr(FilterOperator.Regexp) }) 
    [FilterOperator.Regexp]?: Nullable<string>;

    @StringField({ nullable: true, description: getDescr(FilterOperator.Nregexp) }) 
    [FilterOperator.Nregexp]?: Nullable<string>;

    @StringArrField({ nullable: true, description: getDescr(FilterOperator.In) })  
    [FilterOperator.In]?: Nullable<string[]>;

    @StringArrField({ nullable: true, description: getDescr(FilterOperator.Nin) }) 
    [FilterOperator.Nin]?: Nullable<string[]>;
}

const stringFilterInputTypeFn = () => StringFilterInput;

export const StringFilterInputField: I.GqlFieldDecorFactory<StringFilterInput> = (
    opts => Field(stringFilterInputTypeFn, opts)
);
