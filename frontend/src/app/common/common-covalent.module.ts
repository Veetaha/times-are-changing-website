import { NgModule } from '@angular/core';

import { CovalentLayoutModule  } from '@covalent/core/layout';
import { CovalentMessageModule } from '@covalent/core/message';

import { CovalentMarkdownModule } from '@covalent/markdown';

@NgModule({
    exports: [
        CovalentLayoutModule,
        CovalentMarkdownModule,
        CovalentMessageModule
    ]
})
export class CommonCovalentModule { }