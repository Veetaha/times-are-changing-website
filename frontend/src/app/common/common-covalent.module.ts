import { NgModule } from '@angular/core';

import { CovalentLayoutModule    } from '@covalent/core/layout';
import { CovalentMessageModule   } from '@covalent/core/message';
import { CovalentDialogsModule   } from '@covalent/core/dialogs';
import { CovalentDataTableModule } from '@covalent/core/data-table';
import { CovalentSearchModule    } from '@covalent/core/search';
import { CovalentCommonModule    } from '@covalent/core/common';

import { CovalentMarkdownModule   } from '@covalent/markdown';
import { CovalentHighlightModule  } from '@covalent/highlight';
import { CovalentTextEditorModule } from '@covalent/text-editor';


@NgModule({
    exports: [
        CovalentLayoutModule,
        CovalentMarkdownModule,
        CovalentMessageModule,
        CovalentHighlightModule,
        CovalentTextEditorModule,
        CovalentDialogsModule,
        CovalentDataTableModule,
        CovalentSearchModule,
        CovalentCommonModule
    ]
})
export class CommonCovalentModule { }