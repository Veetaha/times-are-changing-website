import { NgModule } from '@angular/core';

import { AppRoutingModule   } from './app-routing.module';
import { CommonModule       } from './common/common.module';
import { ErrorModule        } from './error/error.module';
import { AuthModule         } from './auth/auth.module';
import { AppComponent       } from './app.component';
import { HomeComponent      } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeveloperModule    } from './developer/developer.module';
import { FooterComponent    } from './footer/footer.component';
import { NavigationDrawerComponent } from './navigation-drawer/navigation-drawer.component';

@NgModule({
    imports: [   
        CommonModule,
        DeveloperModule,
        AuthModule,
        ErrorModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        HomeComponent,
        FooterComponent,
        NavigationDrawerComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
