import { NgModule } from '@angular/core';
import { CommonCovalentModule } from '../common-covalent.module';
import { CommonMaterialModule } from '../common-material.module';
import { PaginationComponent, PageBodyDirective } from './pagination.component';

@NgModule({
    imports: [
        CommonCovalentModule,
        CommonMaterialModule
    ],
    declarations: [
        PaginationComponent,
        PageBodyDirective
    ],
    exports: [
        PaginationComponent,
        PageBodyDirective
    ]
})
export class PaginationModule {}