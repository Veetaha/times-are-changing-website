import { Nullable } from 'ts-typedefs';
import { InputType, Field } from "type-graphql";

import * as I from '@app/interfaces';
import { DateField, DateArrField } from '@utils/gql/decorators/explicit-type-field.decorator';

import { AbstractFilterInput     } from './abstract-filter.input';
import { FilterOperator, getDescr } from '../fitler-operator.enum';

@InputType({
    description: 'Filter input parameters for `Date` type.'
})
export class DateFilterInput extends AbstractFilterInput {
    @DateField({ nullable: true, description: getDescr(FilterOperator.Eq) }) 
    [FilterOperator.Eq]!:  Nullable<Date>;

    @DateField({ nullable: true, description: getDescr(FilterOperator.Neq) }) 
    [FilterOperator.Neq]!: Nullable<Date>;

    @DateField({ nullable: true, description: getDescr(FilterOperator.Geq) }) 
    [FilterOperator.Geq]!: Nullable<Date>;

    @DateField({ nullable: true, description: getDescr(FilterOperator.Leq) }) 
    [FilterOperator.Leq]!: Nullable<Date>;

    @DateField({ nullable: true, description: getDescr(FilterOperator.Gt) }) 
    [FilterOperator.Gt]!:  Nullable<Date>;

    @DateField({ nullable: true, description: getDescr(FilterOperator.Lt) }) 
    [FilterOperator.Lt]!:  Nullable<Date>;

    @DateArrField({nullable: true, description: getDescr(FilterOperator.In) }) 
    [FilterOperator.In]!:  Nullable<Date[]>;

    @DateArrField({nullable: true, description: getDescr(FilterOperator.Nin)}) 
    [FilterOperator.Nin]!: Nullable<Date[]>;
}

const dateFilterInputTypeFn = () => DateFilterInput;

export const DateFilterInputField: I.GqlFieldDecorFactory<DateFilterInput> = (
    opts => Field(dateFilterInputTypeFn, opts)
);
