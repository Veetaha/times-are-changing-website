import { Class } from 'ts-typedefs';
import { ObjectType, Field } from 'type-graphql';
import { Min } from 'class-validator';

import { AssignConstructable } from '@common/utils/obj/assign-constructable';

import { IntField } from '../decorators/explicit-type-field.decorator';


/**
 * Creates an abstract class that is decorated with `@ObjectType()` that 
 * defines a generic type for pagination response. Extend it to instantiate
 * for your needs.
 * 
 * @param ItemClass `@ObjectType()` class that defines the type of page items.
 */
export function Page<TItemClass extends Class>(ItemClass: TItemClass) {

    @ObjectType({ 
        isAbstract: true, 
        description: 'Simple pagination response type with payload and total items info.'
    })
    abstract class GenericPage extends AssignConstructable<GenericPage> {
        @Field(_type => [ItemClass], { 
            description: 'Contains an array of items payload for this page.'
        })
        data!: InstanceType<TItemClass>[];

        @Min(0)
        @IntField({ 
            description: 
            'Total number of items a client can query with this request. ' +
            'It must me an integer that is >= 0.' 
        })
        total!: number;
    }

    return GenericPage;
}
