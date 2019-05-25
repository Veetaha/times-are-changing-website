import { NgModule } from '@angular/core';

import { CovalentLayoutModule } from '@covalent/core/layout';

import { CovalentMarkdownModule } from '@covalent/markdown';

@NgModule({
    exports: [
        CovalentLayoutModule,
        CovalentMarkdownModule,
    ]
})
export class CommonCovalentModule { }