import { InputType, Field } from 'type-graphql';

import { BooleanField } from '@utils/gql/decorators/explicit-type-field.decorator';
import { SortingOrder } from './sorting-order.enum';

@InputType({
    description: 'Defines sorting order for the given field.'
})
export class SortInput {
    @BooleanField({
        nullable: true,
        description: 'Defines whether to return `null` values first or not (`false` by default)'
    })
    nullsFirst?: boolean;

    @Field(_type => SortingOrder, {
        description: 'Defines the order for the given field to be sorted with.'
    })
    ordering!: SortingOrder;

    private getOrdering() {
        return this.ordering === SortingOrder.Asc ? 'ASC' : 'DESC';
    }

    getOrderingCondition() {
        return this.nullsFirst == null 
            ? this.getOrdering() 
            : { 
                order: this.getOrdering(), nulls: 
                this.nullsFirst ? 'NULLS FIRST' : 'NULLS LAST'
            } as const;
    }
}