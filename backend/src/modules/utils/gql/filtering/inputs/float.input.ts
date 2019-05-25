import { Nullable } from 'ts-typedefs';
import { InputType, Field } from "type-graphql";

import * as I from '@app/interfaces';
import { FloatField, FloatArrField } from '@utils/gql/decorators/explicit-type-field.decorator';

import { AbstractFilterInput      } from './abstract-filter.input';
import { FilterOperator, getDescr } from '../fitler-operator.enum';

@InputType({ description: "Filter input parameters for `Float` type" })
export class FloatFilterInput extends AbstractFilterInput {
    @FloatField({ nullable: true, description: getDescr(FilterOperator.Eq) })      
    [FilterOperator.Eq]?:  Nullable<number>;

    @FloatField({ nullable: true, description: getDescr(FilterOperator.Neq) })      
    [FilterOperator.Neq]?: Nullable<number>;

    @FloatField({ nullable: true, description: getDescr(FilterOperator.Geq) })      
    [FilterOperator.Geq]?: Nullable<number>;

    @FloatField({ nullable: true, description: getDescr(FilterOperator.Leq) })      
    [FilterOperator.Leq]?: Nullable<number>;

    @FloatField({ nullable: true, description: getDescr(FilterOperator.Gt) })      
    [FilterOperator.Gt]?:  Nullable<number>;

    @FloatField({ nullable: true, description: getDescr(FilterOperator.Lt) })      
    [FilterOperator.Lt]?:  Nullable<number>;

    @FloatArrField({ nullable: true, description: getDescr(FilterOperator.In) })
    [FilterOperator.In]?:  Nullable<number[]>;

    @FloatArrField({ nullable: true, description: getDescr(FilterOperator.Nin) })
    [FilterOperator.Nin]?: Nullable<number[]>;

}

const floatFilterInputTypeFn = () => FloatFilterInput;

export const FloatFilterInputField: I.GqlFieldDecorFactory<FloatFilterInput> = (
    opts => Field(floatFilterInputTypeFn, opts)
);
