import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { ImageService } from '@app/common/image/image.service';

import { PagedNews } from '../../news.interfaces';
import { UserRoleLimit } from '@app/auth/user-role-limit.obj';
import { UserRole } from '@app/gql/generated';

@Component({
    selector:    'app-paged-news',
    templateUrl: './paged-news.component.html',
    styleUrls:  ['./paged-news.component.scss']
})
export class PagedNewsComponent {
    @Input() news!: PagedNews;
    @Output() deleteNews = new EventEmitter<undefined>();

    editAndDeleteNewsRoleLimit: UserRoleLimit = {
        areAllowed: true, 
        roles: [UserRole.Admin]  
    };
    emphasizeNews = false;

    @ViewChild('card',   { read: ElementRef }) card!:   ElementRef<HTMLElement>;
    @ViewChild('header', { read: ElementRef }) header!: ElementRef<HTMLElement>;

    constructor(
        public readonly images: ImageService
    ) {}

}