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
import { NavDrawerModule    } from './nav-drawer/nav-drawer.module';
import { MediaModule        } from './media/media.module';
import { NewsModule         } from './news/news.module';

@NgModule({
    imports: [   
        CommonModule,
        DeveloperModule,
        AuthModule,
        ErrorModule,
        UserModule,
        DashboardModule,
        MediaModule,
        NavDrawerModule,
        NewsModule,
    
        // keep it the last in import array because it contains "catch-all" route
        AppRoutingModule 
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        FooterComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
