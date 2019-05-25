import { PropertyDecorator, Class } from 'ts-typedefs';

import { composeDecorators } from '@utils/meta';

const ValidationsMetaKey = 'app:constraints';

export type PropDecor = PropertyDecorator<unknown, string>;

/**
 * Defines and stores validations for the given property of target class.
 * @param validations `'class-validator'` decorators to store and reuse.
 */
export function Validations
(...validations: PropDecor[]): PropDecor {
    return (proto, key) => {
        const composedValidations = composeDecorators(...validations);

        const meta: undefined | PropDecor[] = Reflect.getOwnMetadata(
            ValidationsMetaKey, proto.constructor, key
        );
        if (meta != null) {
            meta.push(...validations);
        } else {
            Reflect.defineMetadata(
                ValidationsMetaKey, composedValidations, proto.constructor, key
            );
        }
        return composedValidations(proto, key);
    }; 
}

/**
 * Finds and defines the same validations as for the given `key` of `SrcClass`
 * @param SrcClass Class to get stored validations from. 
 * @param key      Defines the property from `SrcClass` to get validations from.
 */
export function ValidateAs
<TSrcClass extends Class>
(SrcClass: TSrcClass, key: keyof InstanceType<TSrcClass>): PropDecor {
    const validations = Reflect.getOwnMetadata(ValidationsMetaKey, SrcClass, key as any);
    if (validations == null) {
        throw new Error(`No validation were previously defined for ${SrcClass.name}['${key}']`);
    }
    return validations;
}