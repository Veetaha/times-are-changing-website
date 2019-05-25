import { Component  } from '@angular/core';
import { Store      } from '@ngxs/store';

import { FormService } from '@utils/form.service';
import { limits       } from '@common/constants';
import { OpenHomePage } from '@app/app.actions';

import { AuthState        } from '../auth.state';
import { AuthFormService, AuthFormGroup  } from '../auth-form.service';
import { SignIn } from '../auth.actions';

type SignInFormGroup = AuthFormGroup<'login' | 'password'>;

@Component({
    selector:    'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls:  ['./sign-in.component.scss']
})
export class SignInComponent {
    readonly isFetchingClient$ = this.store.select(AuthState.isFetchingClient);
    readonly limits = limits;
    readonly form: SignInFormGroup;

    constructor(
        private readonly store: Store,
        forms: FormService,
        authForms: AuthFormService
    ) { 
        this.form = forms.createFormGroup<SignInFormGroup>({
            login:    authForms.createLoginFormControl(''),
            password: authForms.createPasswordFormControl('')
        });
    }

    submitForm() {
        if (this.form.invalid) {
            throw new Error('Cannot submit invalid form');
        }

        const { login, password } = this.form.value;
        this.store
            .dispatch(new SignIn({ login, password }))
            .subscribe(() => {
                if (this.store.selectSnapshot(AuthState.clientSnap) != null) {
                    this.store.dispatch(OpenHomePage);
                }
            });
    }
}
