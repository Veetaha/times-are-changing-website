import _ from 'lodash';
import { Component } from '@angular/core';
import { Store     } from '@ngxs/store';

import { OpenHomePage } from '@app/app.actions';
import { limits       } from '@common/constants';
import { FormService } from '@utils/form.service';

import { AuthState        } from '../auth.state';
import { AuthFormService, AuthFormGroup } from '../auth-form.service';
import { SignUp } from '../auth.actions';

type SignUpFormGroup = AuthFormGroup<'login' | 'name' | 'password'>;

@Component({
    selector:    'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls:  ['./sign-up.component.scss']
})
export class SignUpComponent {
    readonly isFetchingClient$ = this.store.select(AuthState.isFetchingClient);
    readonly limits = limits;
    readonly form: SignUpFormGroup;

    constructor(
        private readonly store: Store,
        forms: FormService,
        authForms: AuthFormService
    ) { 
        this.form = forms.createFormGroup<SignUpFormGroup>({
            login:    authForms.createLoginFormControl(''),
            password: authForms.createPasswordFormControl(''),
            name:     authForms.createNameFormControl('')
        });
    }

    submitForm() {
        if (this.form.invalid) {
            throw new Error('Cannot submit invalid form');
        }
        const { login, password, name } = this.form.value;        
        this.store
            .dispatch(new SignUp({ credentials: { login, password }, name }))
            .subscribe(() => {
                if (this.store.selectSnapshot(AuthState.isAuthorizedSnap)) {
                    this.store.dispatch(OpenHomePage);
                }   
            }, _.noop);
    }
}
