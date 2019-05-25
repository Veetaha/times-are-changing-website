import { Obj, ValueOf, Nullable, InstanceType } from 'ts-typedefs';
import { InputType, Field } from "type-graphql";

import { AbstractFilterInput } from './abstract-filter.input';
import { getDescr, FilterOperator } from '../fitler-operator.enum';


/**
 * Filter input parameters for `TEnum` type.
 * @param EnumObj Enum object that contains target enum values, often it is 
 *                an original TypeScript enum.
 */
export function EnumFilterInput<TEnum extends Obj<any>>(EnumObj: TEnum, enumName: string) {
    type TEnumValue = ValueOf<TEnum>;

    const enumTypeFn    = () => EnumObj;
    const enumArrTypeFn = () => [EnumObj];

    @InputType({
        isAbstract: true,
        description: `Filter input parameters for ${'`'}${enumName}${'`'} type.`
    })
    abstract class GenericEnumFilterInput extends AbstractFilterInput {

        @Field(enumTypeFn, { nullable: true, description: getDescr(FilterOperator.Eq) })
        [FilterOperator.Eq]?: Nullable<TEnumValue>;

        @Field(enumTypeFn, { nullable: true, description: getDescr(FilterOperator.Neq) })      
        [FilterOperator.Neq]?: Nullable<TEnumValue>;

        @Field(enumArrTypeFn, { nullable: true, description: getDescr(FilterOperator.In) })  
        [FilterOperator.In]?: Nullable<TEnumValue[]>;

        @Field(enumArrTypeFn, { nullable: true, description: getDescr(FilterOperator.Nin) }) 
        [FilterOperator.Nin]?: Nullable<TEnumValue[]>;    
    }
    return GenericEnumFilterInput;
}

export type EnumFilterInput = InstanceType<ReturnType<typeof EnumFilterInput>>;