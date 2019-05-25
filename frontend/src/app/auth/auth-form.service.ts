import { Injectable } from '@angular/core';

import { limits      } from '@common/constants';
import { FormService } from '@utils/form.service';
import { TypedFormGroup } from '@app/interfaces';

export interface AuthFormGroupValues {
    login:    string;
    password: string;
    name:     string;
}

export type AuthFormGroup<TKeys extends keyof AuthFormGroupValues = keyof AuthFormGroupValues> = 
    TypedFormGroup<Pick<AuthFormGroupValues, TKeys>>;

@Injectable({ providedIn: 'root' })
export class AuthFormService {

    constructor(private readonly forms: FormService) {}


    createLoginFormControl(initialValue: string) {
        return this.forms.createRequiredTextFromControl(
            initialValue, limits.user.login
        );
    }
    createPasswordFormControl(initialValue: string) {
        return this.forms.createRequiredTextFromControl(
            initialValue, limits.user.password
        );
    }
    createNameFormControl(initialValue: string) {
        return this.forms.createRequiredTextFromControl(
            initialValue, limits.user.name
        );
    }


}