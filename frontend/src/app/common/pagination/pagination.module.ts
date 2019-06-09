import { NgModule    } from '@angular/core';

import { CommonCovalentModule } from '../common-covalent.module';
import { CommonMaterialModule } from '../common-material.module';

import { PaginationComponent } from './pagination.component';
import { PageBodyDirective, PaginationFiltersDirective } from './pagination.directives';
import { PaginationSearchInputComponent } 
from './pagination-search-input/pagination-search-input.component';

@NgModule({
    imports: [
        CommonCovalentModule,
        CommonMaterialModule
    ],
    declarations: [
        PaginationComponent,
        PageBodyDirective,
        PaginationFiltersDirective,
        PaginationSearchInputComponent
    ],
    exports: [
        PaginationComponent,
        PageBodyDirective,
        PaginationFiltersDirective
    ]
})
export class PaginationModule {}