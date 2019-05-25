import { MapValues, Obj, Nullable } from 'ts-typedefs';

import { SortInput } from './sort.input';

/**
 * Defines an interface that you should implement when defining `*SortInput` 
 * classes. Thus you will get better type checking.
 * 
 * @param TTargetObj Target type to define `*SortInput` class for.
 */
export type ISortInput<TTargetObj extends Obj = Obj> = Partial<
    MapValues<TTargetObj, Nullable<SortInput>>
>;