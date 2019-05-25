import { Obj } from 'ts-typedefs';

export interface PickConstructableClass<
    TData extends Obj, 
    TKeys extends keyof TData = keyof TData
> {
    readonly keys: TKeys[];
    new (data: Pick<TData, TKeys>): Pick<TData, TKeys>;
}

export const PickConstructable = <TData extends Obj>() =>
    <TKeys extends keyof TData>(...keys: TKeys[]) =>  
        class GenericPickConstructable {
            static readonly keys = keys;
            constructor(data: Pick<TData, TKeys>) {
                for (const key of GenericPickConstructable.keys) {
                    (this as any)[key] = data[key];
                }
            }
        } as PickConstructableClass<TData, TKeys>;


const p = PickConstructable<{ mama: string; papa: number }>()('mama');