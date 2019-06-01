import { Component, Directive, Input, TemplateRef, ContentChild, OnInit } 
from '@angular/core';
import { PaginationInput, Page, PageFetcherFn, PaginationCtx } from './pagination.interfaces';
import { Nullable } from 'ts-typedefs';

@Directive({ selector: '[appPageBody]' })
export class PageBodyDirective {}

@Component({
    selector: 	 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls:  ['./pagination.component.scss']
})
export class PaginationComponent<TData> implements OnInit  {
    @Input() searchInputPlaceholder = 'Type here to search';
    @Input() nothingWasFoundMessage = 'Nothing was found';
    @Input() showFirstLastButtons   = true;
    @Input() pageSizeOptions        = [5, 10, 20, 50, 100];
    @Input('pageFetcher') pageFetcher!: PageFetcherFn<TData>;
    
    isSearchEnabled = false;
    @Input() set noSearch(value: unknown) {
        this.isSearchEnabled = value === '' || Boolean(value);
    }

    @ContentChild(PageBodyDirective, { read: TemplateRef }) 
    templateRef?: TemplateRef<PaginationCtx<TData>>;
  	    
  	page?: Nullable<Page<TData>> = null;
  	paginationInput: PaginationInput = { 
        limit:  5,
        offset: 0,
        search: ''
    };

  	ngOnInit() {
        // FIXME: ExpressionHasChangedAfterItWasChecked error in app.component.html
        // *veeLet="isAwaitingResponses$ | async"
        // As a workaround, deffering initialization till the next spin of event loop
        setTimeout(() => this.fetchPage());
  	}

  	fetchPage({
  		offset = this.paginationInput.offset,
  		limit  = this.paginationInput.limit,
  		search = this.paginationInput.search
  	}: Partial<PaginationInput> = this.paginationInput) {
  		this.pageFetcher({ offset, limit, search })
  		    .subscribe(page => { 
                this.paginationInput = { offset, limit, search };
                this.page = page;
            });
  	}

}
