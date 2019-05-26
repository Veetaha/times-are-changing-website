import { Nullable } from 'ts-typedefs';
import { InputType, Field } from 'type-graphql';

import { FilterUnion      } from '../filter-union.enum';
import { FilterOperator   } from '../fitler-operator.enum';

@InputType({ 
    isAbstract: true,
    description: "Abstract filter input with `unionMode` field."
})
export abstract class AbstractFilterInput<TInputType = unknown> {

    @Field(_type => FilterUnion, {
        nullable: true,
        description: 
        "Defines the mode (logical operator) to unite all filter conditions " + 
        "(`And` by default)."
    })
    unionMode?: Nullable<FilterUnion>;

    [FilterOperator.Eq]?:       Nullable<TInputType>;
    [FilterOperator.Neq]?:      Nullable<TInputType>;
    [FilterOperator.Gt]?:       Nullable<TInputType>;
    [FilterOperator.Geq]?:      Nullable<TInputType>;
    [FilterOperator.Lt]?:       Nullable<TInputType>;
    [FilterOperator.Leq]?:      Nullable<TInputType>;
    [FilterOperator.Regexp]?:   Nullable<string>;
    [FilterOperator.Nregexp]?:  Nullable<string>;
    [FilterOperator.Iregexp]?:  Nullable<string>;
    [FilterOperator.Niregexp]?: Nullable<string>;
    [FilterOperator.In]?:       Nullable<TInputType[]>;
    [FilterOperator.Nin]?:      Nullable<TInputType[]>;

}