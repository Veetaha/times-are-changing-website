import { Nullable, Obj } from 'ts-typedefs';

import { BooleanFilterInput } from './boolean.input';
import { FloatFilterInput   } from './float.input';
import { IntFilterInput     } from './int.input';
import { StringFilterInput  } from './string.input';
import { EnumFilterInput    } from './enum.input';
import { DateFilterInput    } from './date.input';

type IPropsFilterInputImpl<TTarget = any> = (
    TTarget extends number            ? 
    IntFilterInput | FloatFilterInput :

    TTarget extends string              ? 
    StringFilterInput | EnumFilterInput :

    TTarget extends boolean ? 
    BooleanFilterInput      :

    TTarget extends Date ?
    DateFilterInput      :

    never
);

/**
 * Defines an interface that you should implement when defining `*FilterInput` 
 * classes. Thus you will get better type checking.
 * 
 * @param TTargetObj Target type to define `*FilterInput` class for.
 */
export type IPropsFilterInput<TTargetObj extends Obj<any> = Obj<any>> = {
    [TKey in keyof TTargetObj]?: Nullable<IPropsFilterInputImpl<TTargetObj[TKey]>>;
};