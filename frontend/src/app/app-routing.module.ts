import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

// @dynamic
const routes = [
    { path: '', component: HomeComponent } as const,
    { path: '**', redirectTo: `error/not-found` } as const
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
