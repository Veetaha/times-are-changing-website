import { Nullable } from 'ts-typedefs';
import { InputType, Field } from "type-graphql";

import * as I from '@app/interfaces';
import { BooleanField } from '@utils/gql/decorators/explicit-type-field.decorator';

import { AbstractFilterInput } from './abstract-filter.input';
import { FilterOperator, getDescr } from '../fitler-operator.enum';

@InputType({
    description: "Filter input parameters for `Boolean` type."
})
export class BooleanFilterInput extends AbstractFilterInput<boolean> {
    @BooleanField({
        nullable: true, 
        description: getDescr(FilterOperator.Eq)
    }) 
    [FilterOperator.Eq]?:  Nullable<boolean>;

    @BooleanField({
        nullable: true, 
        description: getDescr(FilterOperator.Neq)
    }) 
    [FilterOperator.Neq]?: Nullable<boolean>;
}

const booleanFilterInputTypeFn = () => BooleanFilterInput;

export const BooleanFilterInputField: I.GqlFieldDecorFactory<BooleanFilterInput> = (
    opts => Field(booleanFilterInputTypeFn, opts)
);
