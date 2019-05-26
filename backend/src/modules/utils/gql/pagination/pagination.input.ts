import { Class, Nullable, InstanceType } from 'ts-typedefs';
import { InputType } from 'type-graphql';
import { Min, Max } from 'class-validator';

import { IntField           } from '@utils/gql/decorators/explicit-type-field.decorator';
import { NestedInputField   } from '@utils/gql/decorators/nested-input-field.decorator';
import { ISortInput         } from '@utils/gql/sorting/sort-input.interface';
import { IPropsFilterInput  } from '@utils/gql/filtering/inputs/props-filter-input.interface';
import { ObjFilterInput } from '@utils/gql/filtering/inputs/obj-filter.input';

export interface PaginationInputOpts<
    TEntityClass      extends Class,
    TPropsFilterClass extends Class<IPropsFilterInput<InstanceType<TEntityClass>>>, 
    TSortClass        extends Class<ISortInput<InstanceType<TEntityClass>>>
> {
    minLimit?:   number;
    maxLimit?:   number;
    propsFilter: TPropsFilterClass;
    entity:      TEntityClass;
    sort:        TSortClass;
}

export function PaginationInput<
    TEntityClass extends Class,
    TFilterClass extends Class<IPropsFilterInput<InstanceType<TEntityClass>>>, 
    TSortClass   extends Class<ISortInput<InstanceType<TEntityClass>>>
>({
    minLimit = 0,
    maxLimit = 500,
    propsFilter: PropsFilterClass,
    entity: EntityClass,
    sort:   SortClass
}: PaginationInputOpts<TEntityClass, TFilterClass, TSortClass>) {

    @InputType(`${EntityClass.name}FilterInput`)
    class MetaEntityFilterInput extends ObjFilterInput(EntityClass, PropsFilterClass) {}

    @InputType({ isAbstract: true })
    abstract class GenericPaginationInput {

        @Max(maxLimit)
        @Min(minLimit)
        @IntField({
            description: 
            `Maximum amount of items to return for page. It must be an integer ` +
            `within the range [${minLimit}, ${maxLimit}]`
        })
        limit!: number;

        @Min(0)
        @IntField({
            description:
            `Offset that defines an index of the beginning of the page of items. ` +
            `It must be an integer that is >= 0.`
        })
        offset!: number;

        @NestedInputField(_type => MetaEntityFilterInput, {
            nullable: true,
            description: `Defines limitations for the items of the returned page.`
        })
        filter?: Nullable<MetaEntityFilterInput>;

        @NestedInputField(_type => SortClass, {
            nullable: true,
            description: `Defines sorting order for the items according to their property values.`
        })
        sort?: Nullable<InstanceType<TSortClass>>;
    }

    return GenericPaginationInput;
}


export type PaginationInput = InstanceType<ReturnType<typeof PaginationInput>>;