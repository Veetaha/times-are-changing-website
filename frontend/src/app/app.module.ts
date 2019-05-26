import { NgModule } from '@angular/core';

import { AppRoutingModule   } from './app-routing.module';
import { CommonModule       } from './common/common.module';
import { ErrorModule        } from './error/error.module';
import { AuthModule         } from './auth/auth.module';
import { AppComponent       } from './app.component';
import { HomeComponent      } from './home/home.component';
import { DeveloperModule    } from './developer/developer.module';
import { FooterComponent    } from './footer/footer.component';
import { DashboardModule    } from './dashboard/dashboard.module';
import { UserModule         } from './user/user.module';
import { NavigationDrawerComponent } from './navigation-drawer/navigation-drawer.component';

@NgModule({
    imports: [   
        CommonModule,
        DeveloperModule,
        AuthModule,
        ErrorModule,
        UserModule,
        AppRoutingModule,
        DashboardModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        FooterComponent,
        NavigationDrawerComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
