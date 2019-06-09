import { Nullable } from 'ts-typedefs';
import { Component, Input, TemplateRef, ContentChild, OnInit } 
from '@angular/core';

import { Disposable } from '@utils/disposable';

import { PageFetcherOpts, Page, PageFetcherFn, PaginationCtx } from './pagination.interfaces';
import { PaginationFiltersDirective, PageBodyDirective } from './pagination.directives';



@Component({
    selector: 	 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls:  ['./pagination.component.scss']
})
export class PaginationComponent<TData> extends Disposable implements OnInit {
    /**
     * Amount of milliseconds to wait before calling `pageFetcher` after user
     * has stopped typing search request.
     */
    @Input() debounceSearchTime = 400;

    /**
     * Amount of milliseconds to wait before calling `pageFetcher` after user
     * has stopped changing search filters.
     */
    @Input() debounceFilteringTime = 100;

    /**
     * Placeholder text for search input.
     */
    @Input() searchInputPlaceholder = 'Type here to search';
    /**
     * Text that gets displayed when `pageFetcher` returned `0` results.
     */
    @Input() nothingWasFoundMessage = 'Nothing was found';
    /**
     * Defines whether to provide text search input or not.
     */
    @Input() noSearch = false;
    /**
     * Defines whether to show buttons that navigate user to first/last page.
     */
    @Input() showFirstLastButtons = true;
    /**
     * If `true` pagination controls will be hidden if `pageFetcher` returned
     * result `total` number of items that may fit into a single page.
     */
    @Input() hideControlsIfSinglePage = true;       
    /**
     * Possible page size limit options that the user may select.
     */
    @Input() pageSizeOptions = [5, 10, 20, 50, 100];
    /**
     * Function that returns a page of data that will be displayed.
     * Inspect `PageFetcherFn<TData>` signature for more details.
     */
    @Input() pageFetcher!: PageFetcherFn<TData>;
    
    
    @ContentChild(PaginationFiltersDirective, { read: TemplateRef })
    filtersTemplateRef?: Nullable<TemplateRef<PaginationCtx<TData>>>;

    @ContentChild(PaginationFiltersDirective)
    filtersDirective?: Nullable<PaginationFiltersDirective>;


    @ContentChild(PageBodyDirective, { read: TemplateRef }) 
    pageBodyTemplateRef!: TemplateRef<PaginationCtx<TData>>;
  	    
  	page?: Nullable<Page<TData>> = null;
  	pageFetcherOpts: PageFetcherOpts = { 
        limit:  5,
        offset: 0,
        search: '',
        hasFiltering: false
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
                : this.pageFetcherOpts.offset
        });
    }

    shouldDisplayPaginationControls() {
        return !this.hideControlsIfSinglePage || this.page!.total > this.pageFetcherOpts.limit;
    }


  	fetchPage({
  		offset       = this.pageFetcherOpts.offset,
  		limit        = this.pageFetcherOpts.limit,
        search       = this.pageFetcherOpts.search,
        hasFiltering = this.pageFetcherOpts.hasFiltering
  	}: Partial<PageFetcherOpts> = this.pageFetcherOpts) {
        const opts = { offset, limit, search, hasFiltering };
  		this.pageFetcher(opts).subscribe(page => { 
            this.pageFetcherOpts = opts;
            this.page = page;
        });
  	}

}
