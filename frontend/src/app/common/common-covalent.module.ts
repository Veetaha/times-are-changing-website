import { NgModule } from '@angular/core';

import { CovalentLayoutModule  } from '@covalent/core/layout';
import { CovalentMessageModule } from '@covalent/core/message';

import { CovalentMarkdownModule   } from '@covalent/markdown';
import { CovalentHighlightModule  } from '@covalent/highlight';
import { CovalentTextEditorModule } from '@covalent/text-editor';


@NgModule({
    exports: [
        CovalentLayoutModule,
        CovalentMarkdownModule,
        CovalentMessageModule,
        CovalentHighlightModule,
        CovalentTextEditorModule
    ]
})
export class CommonCovalentModule { }