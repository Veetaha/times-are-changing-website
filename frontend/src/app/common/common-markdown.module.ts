import { NgModule       } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
    imports: [ 
        MarkdownModule.forRoot(),
    ],
    exports: [
        MarkdownModule
    ]
})
export class CommonMarkdownModule { }