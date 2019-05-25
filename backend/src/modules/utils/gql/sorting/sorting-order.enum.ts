import { registerEnumType } from "type-graphql";

export enum SortingOrder {
    Asc  = 'Asc',
    Desc = 'Desc'
}

registerEnumType(SortingOrder, {
    name:        'SortingOrder', 
    description: 'Defines ascending or descending order for sorting items.'
});