import { Obj } from 'ts-typedefs';

import { CoreObjData } from '../../interfaces';

export abstract class AssignConstructable<TDerived extends Obj> {
    constructor(data: CoreObjData<TDerived>) {
        Object.assign(this, data);
    }
}