import { Nullable } from 'ts-typedefs';
import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { limits         } from '@common/constants';
import { FormService    } from '@utils/form.service';
import { TypedFormGroup } from '@app/interfaces';
import { UserRole       } from '@app/gql/generated';

export interface UserFormGroupValues {
    name:        string;
    avatarImgId: string;
    role:        UserRole; // TODO: exclude 'Guest' from this from control value type
}

export type AuthFormGroup<TKeys extends keyof UserFormGroupValues = keyof UserFormGroupValues> = 
    TypedFormGroup<Pick<UserFormGroupValues, TKeys>>;

@Injectable({ providedIn: 'root' })
export class AuthFormService {

    constructor(private readonly forms: FormService) {}

    createNameFormControl(initialValue: string) {
        return this.forms.createRequiredTextFromControl(
            initialValue, limits.user.name
        );
    }

    createAvatarImgIdFormControl(initialValue: Nullable<string>) {
        return new FormControl(initialValue);
    }

    createRoleFormControl(initialValue: UserRole) {
        return new FormControl(initialValue, [Validators.required]);
    }
}