import { NgModule     } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '@app/auth/auth.guard';

import { AllNewsComponent           } from './all-news/all-news.component';
import { CreateNewsComponent        } from './create-news/create-news.component';
import { newsRouteAccessMap         } from './news-routing.limits';
import { NewsDetailsComponent       } from './news-details/news-details.component';
import { NewsDetailsResolverService } from './news-details/news-details-resolver.service';

const canActivate = [AuthGuard];

const routes = [
    {
        path:      'news/create',
        component: CreateNewsComponent,
        data:      newsRouteAccessMap.getRoleLimitFor('news/create'),
        canActivate
    },
    {
        path:      'news/:id',
        component: NewsDetailsComponent,
        resolve: {
            news: NewsDetailsResolverService
        }
    },
    {
        path:      'news',
        component: AllNewsComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NewsRoutingModule { }