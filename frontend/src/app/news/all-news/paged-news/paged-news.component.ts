import { Component, Input, Output, EventEmitter } from '@angular/core';

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
    editAndDeleteNewsRoleLimit: UserRoleLimit = {
        areAllowed: true, 
        roles: [UserRole.Admin]  
    };

    @Input() news!: PagedNews;
    @Output() deleteNews = new EventEmitter<undefined>();

    constructor(
        public readonly images: ImageService
    ) {}

}