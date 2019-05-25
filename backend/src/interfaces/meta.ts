import * as I from '@common/interfaces';

export type TypeFn<
    TTypeClass extends I.Class = I.Class
> = (_type?: any) => TTypeClass;