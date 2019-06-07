import { Injectable } from '@angular/core';
import { FormControl, Validators, ValidatorFn, FormGroup } from '@angular/forms';

import { IntRange } from '@common/utils/math/int-range';
import { TupleShift, TypedFormGroup } from '@app/interfaces';
import { reinterpret } from 'ts-typedefs';


@Injectable({ providedIn: 'root' })
export class FormService {

    createRequiredTextFromControl(
        initialValue: string, 
        limits: IntRange, 
        ...additionalValidators: ValidatorFn[]
    ) {
        return new FormControl(initialValue,[
            Validators.max(limits.max),
            Validators.min(limits.min),
            Validators.required,
            ...additionalValidators
        ]);
    }

    createFormGroup<TFormGroup extends TypedFormGroup<any>>(
        controls: TFormGroup['controls'], 
        ...args: TupleShift<ConstructorParameters<typeof FormGroup>>
    ) {
        return reinterpret<TFormGroup>(new FormGroup(controls, ...args));
    }

}