import { Obj } from 'ts-typedefs';

/**
 * Type guard to check whether `obj` has own property key `key`
 * @param obj Target object to check for having key `key`.
 * @param key `PropertyKey` that needs to be narrowed to `keyof TObj`.
 */
export function hasOwnKey
<TObj extends Obj>
(obj: TObj, key: PropertyKey): key is keyof TObj {
    return obj.hasOwnProperty(key);
}