import { 
    Obj, Op, FilterProps, Func, Tag, ClassDecorator, PropertyDecorator, 
    AccessorDecorator, MethodDecorator, ParameterDecorator
} from 'ts-typedefs';
import { Observable } from 'rxjs';

export * from './jwt-payload.interface';

export type CoreObjData<TObj extends Obj> = FilterProps<
    TObj,
    Op.NotExtends<Func<any, any, TObj>>
>;
export type Decorator = (
    | ClassDecorator 
    | PropertyDecorator 
    | AccessorDecorator 
    | MethodDecorator
    | ParameterDecorator
);

// number within range [0-65635]
export type port_t = Tag<number, 'port_t'>;
export type int    = Tag<number, 'int'>;

export type UnpackObservable<TObservable extends Observable<any>> = (
    TObservable extends Observable<infer TValue> ? TValue : never
);
