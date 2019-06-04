import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DeveloperComponent } from './developer/developer.component';

const routes = [
    {
        path:      'developer',
        component: DeveloperComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeveloperRoutingModule { 
}