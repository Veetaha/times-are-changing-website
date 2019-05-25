import { registerEnumType } from "type-graphql";

export enum FilterUnion {
    And  = 'And',
    Or   = 'Or',
    Nand = 'Nand',
    Nor  = 'Nor'
}

registerEnumType(FilterUnion, {
    name:        'FilterUnion', 
    description: 'Defines a mode to unite all filter conditions for fields or inside one field.'
});