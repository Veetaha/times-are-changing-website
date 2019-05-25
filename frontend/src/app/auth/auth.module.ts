import { NgModule          } from '@angular/core';
import { NgxsModule        } from '@ngxs/store';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CommonModule } from '@app/common/common.module';

import { AuthRoutingModule        } from './auth-routing.module';
import { AuthState                } from './auth.state';
import { SignInComponent          } from './sign-in/sign-in.component';
import { SignUpComponent          } from './sign-up/sign-up.component';
import { AuthTokenInterceptor     } from './auth-token.interceptor';
import { AppIfClientRoleDirective } from './app-if-client-role.directive';

@NgModule({
    imports: [ 
        CommonModule,
        NgxsModule.forFeature([AuthState])
    ],
    exports: [
        AuthRoutingModule,
        AppIfClientRoleDirective
    ],
    providers: [
        { 
            provide:  HTTP_INTERCEPTORS, 
            useClass: AuthTokenInterceptor, 
            multi:    true 
        },
    ],
    declarations: [
        SignInComponent, 
        AppIfClientRoleDirective, SignUpComponent
    ]
})
export class AuthModule {}