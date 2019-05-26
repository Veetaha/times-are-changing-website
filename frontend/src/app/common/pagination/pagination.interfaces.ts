import { Observable } from 'rxjs';

export interface PaginationInput {
    offset:  number;
    limit:   number;
    search?: string;
}
export interface Page<TItems> {
    data:  TItems[];
    total: number;
}

export interface PaginationCtx<T> {
    $implicit: T[];
}

export type PageFetcherFn<T> = (pagination: PaginationInput) => Observable<Page<T>>;