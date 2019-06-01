import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent  } from './home/home.component';
import { MediaComponent } from './media/media.component';

// @dynamic
const routes = [
    { path: 'media', component: MediaComponent },
    { path: '', component: HomeComponent },
    { path: '**', redirectTo: `error/not-found` }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
