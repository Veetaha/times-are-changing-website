import _ from 'lodash';
import { Obj, MapValues, Class, InstanceType } from 'ts-typedefs';
import { InputType      } from 'type-graphql';
import { getRepository  } from 'typeorm';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';

import { NestedInputField    } from '@utils/gql/decorators/nested-input-field.decorator';

import { AbstractFilterInput } from './abstract-filter.input';
import { IPropsFilterInput        } from './props-filter-input.interface';


export type FilterMetadata<TObj extends Obj> = MapValues<TObj, ColumnMetadata>;

export function ObjFilterInput<   
    TEntityClass extends Class, 
    TPropsFilterClass extends Class<IPropsFilterInput<InstanceType<TEntityClass>>>
>
(EntityClass: TEntityClass, PropsFilterClass: TPropsFilterClass) {

    type TEntity = InstanceType<TEntityClass>;
    type TMeta   = FilterMetadata<TEntity>;

    @InputType({ 
        isAbstract: true, 
        description: `Filter input parameters for ${'`'}${EntityClass.name}${'`'} type.`
    })
    abstract class GenericObjFilterInput extends AbstractFilterInput {
        @NestedInputField(_type => PropsFilterClass, { description: "Per-property filters." })
        props!: InstanceType<TPropsFilterClass>;

        private static columnsMetadata?: TMeta; // lazy initializtion
        
        private static initColumnsMetadata() {
            this.columnsMetadata = getRepository(EntityClass)
                .metadata
                .columns
                .reduce(
                    (acc, meta) => ((acc[meta.propertyName as keyof TEntity] = meta), acc), 
                    {} as TMeta
                );
        }

        getColumnsMetadata() {
            if (GenericObjFilterInput.columnsMetadata == null) {
                GenericObjFilterInput.initColumnsMetadata();
            }
            return GenericObjFilterInput.columnsMetadata!;
        }
    }

    return GenericObjFilterInput;
}

export type ObjFilterInput = InstanceType<ReturnType<typeof ObjFilterInput>>;