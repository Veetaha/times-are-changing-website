import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeveloperComponent } from './developer/developer.component';

// @dynamic
const routes: Routes = [
    {
        path:      'developer',
        component: DeveloperComponent
    }
];

// @dynamic
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeveloperRoutingModule { 
}