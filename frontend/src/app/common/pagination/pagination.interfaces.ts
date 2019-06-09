import { Observable } from 'rxjs';

export interface PageFetcherOpts {
    /**
     * Requested page offset index.
     */
    readonly offset:       number;
    /**
     * Requested maximum amount of items per page (inclusive).
     */
    readonly limit:        number;
    /**
     * Query from the text search input.
     */
    readonly search?:      string;
    /**
     * Defiens whether user opted advanced filtering search in.
     */
    readonly hasFiltering: boolean;
}

export interface Page<TItems> {
    /**
     * Current page items array.
     */
    readonly data:  TItems[];
    /**
     * Total amount of pages that may be queried with `search` and `hasFiltering`
     * params being constant.
     */
    readonly total: number;
}

/**
 * Template input context. Example of usage
 * ```html
 * <div *appPageBody="let items; total as total">
 *      {{items | json}} - $implicit represents currently displayed piece of data (page).
 *      {{total}} - total
 * </div>
 * ```
 */
export interface PaginationCtx<T> {
    /**
     * Current page items array.
     */
    readonly $implicit: T[];
    /**
     * Total amount of pages that may be queried with `search` and `hasFiltering`
     * params being constant.
     */
    readonly total: number;
}

/**
 * A function that given `PageFetcherOpts` returns an `Observable` over a currently
 * displayed page of items. It implements the logic of fetching, sorting and filtering.
 * See `PageFetcherOpts` form more details of `PageFetcherFn` params.
 */
export type PageFetcherFn<T> = (opts: PageFetcherOpts) => Observable<Page<T>>;

