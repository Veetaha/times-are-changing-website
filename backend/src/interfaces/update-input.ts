import * as I from '@common/interfaces';

/**
 * Defines a generic type that is passed to `*Service.update()` methods.
 * @param TEntity      Entity type to define update object for.
 * @param TOmmitedKeys Union of keys that must not be present in defined object.
 */
export type UpdateInput<
    TEntity extends I.Obj, 
    TOmittedKeys extends keyof TEntity = never
> = I.Merge<I.NullableProps<TEntity>, Partial<I.Obj<never, TOmittedKeys>>>;