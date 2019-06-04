import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MediaComponent } from './media.component';

const routes = [
    { path: 'media', component: MediaComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class MediaRoutingModule { }
