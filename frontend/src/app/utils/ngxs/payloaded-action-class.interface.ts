import { Obj } from 'ts-typedefs';

export interface PayloadedActionClass<TPayload extends Obj> {
    readonly type: string;
    new (payload: TPayload): TPayload;
}