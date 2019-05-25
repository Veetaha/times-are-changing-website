import _ from 'lodash';
import { Obj, If, UnionIncludes, Merge } from 'ts-typedefs';
import { Route as NgRoute } from '@angular/router';

export type Route<
    TPaths extends string, 
    TData = Obj
> = If<(UnionIncludes<TData, undefined>),
    Merge<NgRoute, { data?: TData; path: TPaths }>,
    Merge<NgRoute, { data:  TData; path: TPaths }>
>;