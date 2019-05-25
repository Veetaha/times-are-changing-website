import { Nullable } from 'ts-typedefs';
import { InputType, Field } from "type-graphql";

import * as I from '@app/interfaces';
import { IntField, IntArrField } from '@utils/gql/decorators/explicit-type-field.decorator';

import { AbstractFilterInput   } from './abstract-filter.input';
import { FilterOperator, getDescr } from '../fitler-operator.enum';

@InputType({ description: "Filter input parameters for `Int` type." })
export class IntFilterInput extends AbstractFilterInput {
    @IntField({ nullable: true, description: getDescr(FilterOperator.Eq) })      
    [FilterOperator.Eq]?:  Nullable<number>;

    @IntField({ nullable: true, description: getDescr(FilterOperator.Neq) })      
    [FilterOperator.Neq]?: Nullable<number>;

    @IntField({ nullable: true, description: getDescr(FilterOperator.Geq) })      
    [FilterOperator.Geq]?: Nullable<number>;

    @IntField({ nullable: true, description: getDescr(FilterOperator.Leq) })      
    [FilterOperator.Leq]?: Nullable<number>;

    @IntField({ nullable: true, description: getDescr(FilterOperator.Gt) })      
    [FilterOperator.Gt]?:  Nullable<number>;

    @IntField({ nullable: true, description: getDescr(FilterOperator.Lt) })      
    [FilterOperator.Lt]?:  Nullable<number>;

    @IntArrField({ nullable: true, description: getDescr(FilterOperator.In) })
    [FilterOperator.In]?:  Nullable<number[]>;

    @IntArrField({ nullable: true, description: getDescr(FilterOperator.Nin) })
    [FilterOperator.Nin]?: Nullable<number[]>;
}

const intFilterInputTypeFn = () => IntFilterInput;

export const IntFilterInputField: I.GqlFieldDecorFactory<IntFilterInput> = (
    opts => Field(intFilterInputTypeFn, opts)
);
