import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

// @dynamic
const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: '**', redirectTo: `error/not-found` }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
