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
    @Input() hideControlsIfSinglePage = true;       
    @Input() pageSizeOptions        = [5, 10, 20, 50, 100];
    @Input() pageFetcher!: PageFetcherFn<TData>;
    @Input() noSearch = false;

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

    /**
     * Updates current page after some intrinsic application has deleted some 
     * items from this page.
     * @param removedItemsAmount Defines the number of items that were deleted from this page.
     */
    updateBecausePageItemsRemoved(removedItemsAmount: number) {
        // FIXME: come up with a more performant solution than refetching the whole page

        // this.page should not be null here, but who knows))
        this.fetchPage({
            offset: this.page && this.page.data.length <= removedItemsAmount 
                ? 0 
                : this.paginationInput.offset
        });
    }

    shouldDisplayPaginationControls() {
        return !this.hideControlsIfSinglePage || this.page!.total > this.paginationInput.limit;
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
