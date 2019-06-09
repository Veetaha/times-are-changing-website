import _ from 'lodash';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector:    'app-pagination-search-input',
    templateUrl: './pagination-search-input.component.html',
    styleUrls:  ['./pagination-search-input.component.scss']
})
export class PaginationSearchInputComponent {
    @Output() 
    readonly search = new EventEmitter<string>();
    @Input()  placeholder = '';
}
